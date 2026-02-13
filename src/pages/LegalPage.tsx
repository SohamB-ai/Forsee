import { BeamsBackground } from "@/components/ui/beams-background";
import { TypingText } from "@/components/ui/TypingText";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

export default function LegalPage() {
    useLenis(() => {
        // Just by calling this hook, we ensure the page's scroll dimension
        // is tracked by the root Lenis instance correctly.
    });
    return (
        <BeamsBackground className="pt-24 font-outfit min-h-screen">
            <div className="relative z-30 min-h-full">
                <section className="py-16 px-6 text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-12 flex justify-center gap-2 inline-block">
                        <TypingText text="Privacy &" className="text-white" />
                        <TypingText text="Terms" className="text-[#9d4edd]" delay={0.5} />
                    </div>

                    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 text-white/80 leading-relaxed text-left pointer-events-auto">
                        {/* Privacy Policy */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-primary/30 pb-2 flex items-center gap-2">
                                🔐 PRIVACY POLICY
                            </h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="font-semibold text-white">Forsee Intelligence Software</p>
                                    <p className="text-sm text-white/50 text-right italic">Last Updated: February 6, 2026</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">1. Introduction</h3>
                                    <p>Forsee Intelligence Software ("we", "our", "us") provides an industrial predictive intelligence platform that enables organizations to monitor asset health, predict failures, simulate future behavior, and optimize maintenance operations using artificial intelligence.</p>
                                    <p>We are committed to protecting your privacy and ensuring that your data is handled responsibly and securely.</p>
                                    <p>This Privacy Policy explains:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>What information we collect</li>
                                        <li>How we use it</li>
                                        <li>How we store and protect it</li>
                                        <li>Your rights regarding your data</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">2. Information We Collect</h3>
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-white/80">2.1 Account & Organization Information</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Name, Email address, Organization name</li>
                                            <li>User role (Admin, Engineer, Viewer)</li>
                                            <li>Authentication provider (local login, Google, etc.)</li>
                                        </ul>
                                        <h4 className="font-semibold text-white/80">2.2 Asset & Sensor Data</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Machine sensor readings, Telemetry time-series data</li>
                                            <li>Operating context (load, environment, mode)</li>
                                            <li>Maintenance records and feedback</li>
                                        </ul>
                                        <h4 className="font-semibold text-white/80">2.3 Dataset & Model Data</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Uploaded datasets, Dataset metadata and schema</li>
                                            <li>Trained model metadata</li>
                                        </ul>
                                        <h4 className="font-semibold text-white/80">2.4 Usage & Log Data</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>IP address, Request timestamps</li>
                                            <li>API usage logs, Error logs, Audit logs</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">3. How We Use Information</h3>
                                    <p>We use collected information to:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Provide and operate the platform</li>
                                        <li>Perform predictive analytics and simulations</li>
                                        <li>Train and serve machine learning models</li>
                                        <li>Generate recommendations and alerts</li>
                                        <li>Improve system reliability and performance</li>
                                        <li>Enforce security and access control</li>
                                    </ul>
                                    <p className="font-medium text-primary/80">We do not sell or rent your personal data.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">4. AI & Model Training</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Customer data is used only to deliver services to that customer.</li>
                                        <li>Models trained on customer data are logically isolated per organization.</li>
                                        <li>Public benchmark datasets may be used to build baseline models.</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">5. Data Storage & Retention</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Data is stored in secure databases.</li>
                                        <li>Encrypted backups are performed regularly.</li>
                                        <li>Data is retained while your account is active or as required by law.</li>
                                        <li>Upon request, data may be exported or deleted.</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">6. Data Security</h3>
                                    <p>Forsee Intelligence Software implements:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Encryption in transit and at rest</li>
                                        <li>Role-based access control</li>
                                        <li>Secure authentication mechanisms</li>
                                        <li>Audit logging, Rate limiting and monitoring</li>
                                    </ul>
                                    <p className="italic text-white/60 text-sm">No system can guarantee absolute security, but we follow industry best practices.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">7. Third-Party Services</h3>
                                    <p>We may use trusted third-party services for authentication (e.g., Google), cloud infrastructure, and monitoring. These providers are required to protect your data.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">8. Your Rights</h3>
                                    <p>You may request: Access, Correction, Deletion, or Export of your data.</p>
                                    <p>Contact: <span className="text-primary underline">privacy@forseeintelligence.com</span></p>
                                </div>
                            </div>
                        </section>

                        {/* Terms and Conditions */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-primary/30 pb-2 flex items-center gap-2">
                                📜 TERMS & CONDITIONS
                            </h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="font-semibold text-white">Forsee Intelligence Software</p>
                                    <p className="text-sm text-white/50 text-right italic">Last Updated: February 6, 2026</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">1. Acceptance of Terms</h3>
                                    <p>By accessing or using Forsee Intelligence Software, you agree to these Terms and Conditions. If you do not agree, you must not use the platform.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">2. Description of Service</h3>
                                    <p>Forsee Intelligence Software provides asset monitoring, predictive analytics, failure detection, simulation, and maintenance recommendations.</p>
                                    <p className="font-medium text-primary/80">The platform is a decision-support system, not a replacement for professional judgment.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">3. User Accounts</h3>
                                    <p>You are responsible for maintaining confidentiality of credentials, all activities performed under your account, and providing accurate information.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">4. Acceptable Use</h3>
                                    <p>You agree not to use the platform for unlawful purposes, attempt unauthorized access, reverse engineer the system, or upload harmful content.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">5. Intellectual Property</h3>
                                    <p>All software, models, designs, and documentation belong to Forsee Intelligence Software. Users retain ownership of their uploaded data.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">6. AI Output Disclaimer</h3>
                                    <p>Predictions, simulations, and recommendations are probabilistic, may contain inaccuracies, and should be reviewed by qualified professionals. Forsee Intelligence Software is not responsible for damages resulting from reliance solely on system outputs.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">7. Data Ownership</h3>
                                    <p>You own your data. We process your data only to provide the service.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">8. Service Availability</h3>
                                    <p>We aim for high availability but do not guarantee uninterrupted service. Maintenance windows and downtime may occur.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">9. Limitation of Liability</h3>
                                    <p>To the maximum extent permitted by law, Forsee Intelligence Software shall not be liable for indirect, incidental, or consequential damages.</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white/90">10. Termination</h3>
                                    <p>We may suspend or terminate accounts for violations of these terms, security risks, or legal requirements. You may terminate your account at any time.</p>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-white/10 text-center">
                                    <p className="text-sm italic">For legal inquiries, contact: <span className="text-primary underline">legal@forseeintelligence.com</span></p>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </BeamsBackground>
    );
}
