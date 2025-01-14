"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Scan, QrCode } from "lucide-react";
import image1 from "@/public/1.png";
import image2 from "@/public/2.png";
import image3 from "@/public/3.png";

const images = [image1, image2, image3];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerDivRef = useRef<HTMLDivElement>(null);

  // Handle image carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Handle QR scanner
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showScanner && !scannerRef.current && scannerDivRef.current) {
      // Add a small delay to ensure the DOM is ready
      timeoutId = setTimeout(() => {
        try {
          setIsScanning(true);
          const scanner = new Html5QrcodeScanner(
            "qr-reader",
            {
              qrbox: {
                width: 250,
                height: 250,
              },
              fps: 5,
              rememberLastUsedCamera: true,
              showTorchButtonIfSupported: true,
            },
            /* verbose= */ false
          );

          scanner.render(onScanSuccess, onScanError);
          scannerRef.current = scanner;
        } catch (error) {
          console.error("Failed to initialize scanner:", error);
          setIsScanning(false);
        }
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
        setIsScanning(false);
      }
    };
  }, [showScanner]);

  const onScanSuccess = (decodedText: string) => {
    setScannedResult(decodedText);
    setIsScanning(false);
    
    // Handle URL redirection
    if (decodedText.startsWith('http')) {
      // Add a small delay to show the scanned result before redirecting
      setTimeout(() => {
        window.location.href = decodedText;
      }, 1000);
    }
    
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
  };

  const onScanError = (error: string) => {
    console.warn(error);
  };

  const handleScannerDialog = (open: boolean) => {
    setShowScanner(open);
    if (!open) {
      setScannedResult("");
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="relative p-10 w-screen h-screen flex flex-col justify-center items-center space-y-10">
      {/* Image Carousel */}
      <div className="size-60 relative overflow-hidden rounded-lg shadow-xl">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute w-full rounded-lg h-full transition-all duration-700 ease-in-out ${
              index === currentImageIndex
                ? "opacity-100 transform-none"
                : "opacity-0 -translate-y-full"
            }`}
          >
            <Image
              src={src}
              alt={`Carousel image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Title Section */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <span className="text-green-600 text-lg font-medium tracking-wide">
          The WowFoodie!
        </span>
        <span className="font-bold text-3xl text-center tracking-tight">
          Food that
          <br /> everyone loves
        </span>
      </div>
      
      {/* QR Code Actions */}
      <div className="flex gap-4">
        {/* Generate QR Code Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-xl px-8 flex gap-2 bg-green-600 hover:bg-green-700">
              <QrCode size={20} />
              Show QR
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scan this QR Code</DialogTitle>
              <DialogDescription>
                Use your mobile device to scan this QR code and access the current page.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg">
              <QRCodeSVG 
                value={currentUrl} 
                size={256}
                level="H"
                includeMargin
                className="shadow-lg rounded-lg"
              />
              <p className="mt-4 text-sm text-gray-500 text-center">
                Scan this QR code to visit the current page on another device
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* QR Code Scanner Dialog */}
        <Dialog onOpenChange={handleScannerDialog}>
          <DialogTrigger asChild>
            <Button className="rounded-xl px-8 flex gap-2 bg-blue-600 hover:bg-blue-700">
              <Scan size={20} />
              Scan QR
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scan a QR Code</DialogTitle>
              <DialogDescription>
                Use your device's camera to scan a QR code. Once scanned, you'll be redirected if it contains a URL.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <div 
                id="qr-reader" 
                ref={scannerDivRef}
                className="w-full max-w-sm mx-auto"
              ></div>
              {scannedResult && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full">
                  <p className="text-sm text-gray-600 break-all">
                    <span className="font-medium">Scanned Result:</span> {scannedResult}
                  </p>
                  {scannedResult.startsWith('http') && (
                    <p className="text-xs text-gray-500 mt-2">
                      Redirecting to URL...
                    </p>
                  )}
                </div>
              )}
              {isScanning && (
                <p className="text-sm text-gray-500 mt-4">
                  Position a QR code in front of your camera
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}