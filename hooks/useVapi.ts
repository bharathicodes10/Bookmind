'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { useAuth } from '@clerk/nextjs';

import { ASSISTANT_ID, DEFAULT_VOICE, VOICE_SETTINGS } from '@/lib/constants';
import { getVoice } from '@/lib/utils';
import { IBook, Messages } from '@/types';
import { startVoiceSession, endVoiceSession } from '../lib/actions/sessions.action';

const VAPI_API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY;

const TIMER_INTERVAL_MS = 1000;

export type CallStatus = 'idle' | 'connecting' | 'starting' | 'listening' | 'thinking' | 'speaking';

export function useVapi(book: IBook) {
    const { userId } = useAuth();

    const [status, setStatus] = useState<CallStatus>('idle');
    const [messages, setMessages] = useState<Messages[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [currentUserMessage, setCurrentUserMessage] = useState('');
    const [duration, setDuration] = useState(0);
    const [limitError, setLimitError] = useState<string | null>(null);

    const vapiRef = useRef<InstanceType<typeof Vapi> | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const sessionIdRef = useRef<string | null>(null);
    const isStoppingRef = useRef(false);

    const voice = book.persona || DEFAULT_VOICE;

    // ✅ INIT VAPI ONLY ONCE
    useEffect(() => {
        if (!vapiRef.current) {
            if (!VAPI_API_KEY) {
                throw new Error('VAPI key missing');
            }
            vapiRef.current = new Vapi(VAPI_API_KEY);
        }
    }, []);

    // ✅ EVENT LISTENERS
   useEffect(() => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    // 🚨 prevent duplicate attachment
    let attached = false;
    if ((vapi as any)._hasListeners) return;
    (vapi as any)._hasListeners = true;

    const handlers = {
        'call-start': () => {
            setStatus('starting');
        },

        'call-end': () => {
            setStatus('idle');
        },

        'speech-start': () => {
            setStatus('speaking');
        },

        'speech-end': () => {
            setStatus('listening');
        },

        message: (message: any) => {
            if (message.type !== 'transcript') return;

            if (message.transcriptType === 'final') {
                setMessages((prev) => {
                    const isDupe = prev.some(
                        (m) =>
                            m.role === message.role &&
                            m.content === message.transcript
                    );
                    return isDupe
                        ? prev
                        : [...prev, { role: message.role, content: message.transcript }];
                });
            }
        },

        error: (err: any) => {
            console.error(err);
            setStatus('idle');
        },
    };

    Object.entries(handlers).forEach(([event, handler]) => {
        vapi.on(event as any, handler as any);
    });

    return () => {
        Object.entries(handlers).forEach(([event, handler]) => {
            vapi.off(event as any, handler as any);
        });

        (vapi as any)._hasListeners = false;
    };
}, []);

    // ✅ START
   const start = useCallback(async () => {
    if (!userId || !vapiRef.current) return;

    setStatus('connecting');
    setLimitError(null);

    try {
        await vapiRef.current.start(ASSISTANT_ID, {
            firstMessage: `Hey, have you read ${book.title}?`,
            variableValues: {
                title: book.title,
                author: book.author,
            },
            voice: {
                provider: '11labs',
                voiceId: getVoice(voice).id,
                model: 'eleven_turbo_v2_5',
                ...VOICE_SETTINGS,
            },
        });
    } catch (err) {
        console.error(err);
        setStatus('idle');
    }
}, [book.title, book.author, userId, voice]);

    // ✅ STOP
   const stop = useCallback(() => {
    if (!vapiRef.current) return;

    console.log("🛑 STOP CLICKED");

    isStoppingRef.current = true;

    vapiRef.current.stop();

    // 🔥 force UI reset immediately
    setStatus('idle');
    setCurrentMessage('');
    setCurrentUserMessage('');

    if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
    }

    startTimeRef.current = null;
}, []);
const isActive =
  status === 'starting' ||
  status === 'listening' ||
  status === 'thinking' ||
  status === 'speaking';
    return {
        status,
        messages,
        isActive,
        currentMessage,
        currentUserMessage,
        duration,
        start,
        stop,
        limitError,
    };
}

export default useVapi;
