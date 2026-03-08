import { BookCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
  return (
    //style={{ backgroundColor: '#f8f4e9' }}
    <Link href={`/books/${slug}`} className="book-card">
      <article className="book-card-content">
        <figure className="book-card-figure">
          <div className="book-card-cover-wrapper">
            <Image
              src={coverURL}
              alt={`${title} cover`}
              className="book-card-cover"
              width={300}
              height={200}
            />
          </div>
        </figure>
        <figcaption className="book-card-meta">
            <h3 className="book-card-title">

            {title}
            </h3>
        <p className="book-card-author">by {author}</p>
            </figcaption>
      </article>
    </Link>
  );
};

export default BookCard;
