export default function introContent({ content }: { content: string }) {
    return (
        <div className="relative inline-flex items-center">
            <div className="absolute left-0 w-24 h-24 bg-amber-100 rounded-full" aria-hidden="true" />
            <h2 className="text-5xl font-bold relative z-10 pl-4">Recent Article</h2>
        </div>
    )
}

