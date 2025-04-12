import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, UploadCloud, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 md:px-20 text-center">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Secure Medical Document Exchange
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A privacy-focused platform for patients and healthcare professionals to share medical records safely.
        </p>
        <div className="mt-8">
          <Button className="text-lg px-6 py-3">Get Started</Button>
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-md">
          <CardContent className="text-center">
            <ShieldCheck className="w-10 h-10 mx-auto text-gray-800 mb-4" />
            <h3 className="text-xl font-semibold">HIPAA Compliant</h3>
            <p className="text-gray-600 mt-2">
              Fully adheres to HIPAA standards for data protection.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md">
          <CardContent className="text-center">
            <UploadCloud className="w-10 h-10 mx-auto text-gray-800 mb-4" />
            <h3 className="text-xl font-semibold">Encrypted Uploads</h3>
            <p className="text-gray-600 mt-2">
              Medical documents are protected with end-to-end encryption.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md">
          <CardContent className="text-center">
            <FileText className="w-10 h-10 mx-auto text-gray-800 mb-4" />
            <h3 className="text-xl font-semibold">Audit Logging</h3>
            <p className="text-gray-600 mt-2">
              Comprehensive audit logs track access and sharing.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
