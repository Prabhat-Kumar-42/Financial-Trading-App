"use client";

interface KycDocumentProps {
  kycImageUrl: string;
}

export default function KycDocument({ kycImageUrl }: KycDocumentProps) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold mb-2">KYC Document</h2>
      <img
        src={kycImageUrl}
        alt="KYC Document"
        className="w-48 max-h-48 object-contain rounded-lg border border-gray-300 shadow-sm"
      />
      <a
        href={kycImageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-blue-600 hover:underline text-sm"
      >
        View / Download
      </a>
    </div>
  );
}
