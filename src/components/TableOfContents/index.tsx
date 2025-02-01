import { Post } from "@/payload-types";
import React from "react";

type Heading = {
    text: string;
    level: number;
};

type TOCProps = {
    json: any; // Replace `any` with a specific type if available
};

const extractHeadings = (node: any, level: number = 0): Heading[] => {
    let headings: Heading[] = [];

    if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
            if (child.type === "block") {
                console.log(child.fields.title);
                headings.push({ text: child.fields.title, level: 2 });
            }
        }
    }

    return headings;
};

export const TableOfContents: React.FC<{ post: Post, classname?: string }> = ({ post, classname }) => {



    if (!post.content) {
        return null;
    }

    const headings = extractHeadings(post.content.root);

    return (
        <div className={classname}>
            <h2 className="text-md font-semibold mb-2">Table of Contents</h2>
            <ul className="list-none space-y-1">
                {headings.map((heading, index) => (
                    <li
                        key={index}
                        className={`pl-1 cursor-pointer text-xs py-2 hover:text-primary`}
                    >
                        <a className="line-clamp-3" href={`/posts/${post.slug}#${heading.text.replaceAll(" ", "-")}`}>{heading.text}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

