import { motion } from "framer-motion";

export default function GodMode() {
    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="relative z-10 text-center"
            >
                <h1
                    className="text-6xl md:text-9xl text-black dark:text-white"
                    style={{ fontFamily: "'Bonheur Royale', cursive" }}
                >
                    Unleash the God within you ...
                </h1>
            </motion.div>
        </div>
    );
}
