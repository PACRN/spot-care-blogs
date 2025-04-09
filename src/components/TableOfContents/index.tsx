'use client';
import { Post } from "@/payload-types";
import React, { useState } from "react";

type Heading = {
    text: string;
    level: number;
};

const extractHeadings = (node: any, level: number = 0): Heading[] => {
    let headings: Heading[] = [];

    if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
            if (child.type === "block") {
                headings.push({ text: child.fields.title, level: 2 });
            }
        }
    }

    return headings;
};

export const TableOfContents: React.FC<{ post: Post, classname?: string }> = ({ post, classname }) => {
    const [activeHeading, setActiveHeading] = useState(0);

    if (!post.content) {
        return null;
    }

    const headings = extractHeadings(post.content.root);

    return (
        <div className={classname}>
            <h2 className="text-xl font-semibold` mb-6">Table of Content</h2>
            <ul className="list-none space-y-4">
                {headings.map((heading, index) => {
                    if (heading.text) {
                        return (
                            <li
                                key={index}
                                className={`relative cursor-pointer group`}
                            >
                                <div
                                    className={`absolute left-0 top-0 w-[3px] h-full ${index === activeHeading ? 'bg-purple-500' : 'bg-transparent group-hover:bg-purple-200'
                                        }`}
                                />
                                <a
                                    className={`block pl-4 py-1 text-xs transition-colors ${index === activeHeading
                                        ? 'text-purple-500 font-medium'
                                        : 'text-gray-700 dark:text-white hover:text-purple-500'
                                        }`}
                                    href={`/posts/${post.slug}#${heading.text.replaceAll(" ", "-")}`}
                                    onClick={() => setActiveHeading(index)}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};