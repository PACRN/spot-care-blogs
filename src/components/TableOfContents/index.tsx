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

    if (node.type === "heading" && node.tag === "h2") {
        const textNode = node.children?.find((child: any) => child.type === "text");
        if (textNode) {
            headings.push({ text: textNode.text, level: level + (node.tag === "h2" ? 1 : 2) });
        }
    }

    if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
            headings = [...headings, ...extractHeadings(child, level)];
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
                        className={`pl-1 cursor-pointer text-xs py-2`}
                    >
                        {heading.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

