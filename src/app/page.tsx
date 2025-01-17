"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Html5Qrcode } from "html5-qrcode";
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
  const html5QrCode = useRef<Html5Qrcode | null>(null);

  // Handle image carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const startScanner = async () => {
    const qrReader = document.getElementById('qr-reader');
    if (!qrReader) {
      console.error('QR reader element not found');
      return;
    }

    try {
      setIsScanning(true);
      if (!html5QrCode.current) {
        html5QrCode.current = new Html5Qrcode('qr-reader');
      }

      const cameras = await Html5Qrcode.getCameras();
      if (cameras && cameras.length > 0) {
        // Try to find the back camera
        const backCamera = cameras.find(camera => 
          camera.label.toLowerCase().includes('back') || 
          camera.label.toLowerCase().includes('rear') ||
          camera.label.toLowerCase().includes('environment')
        );
        
        // Use back camera if found, otherwise use the last camera (usually back on mobile)
        const selectedCamera = backCamera || cameras[cameras.length - 1];
        
        await html5QrCode.current.start(
          selectedCamera.id,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            handleQrCodeScan(decodedText);
          },
          (error) => {
            console.warn(error);
          }
        );
      } else {
        console.error('No cameras found');
        setIsScanning(false);
      }
    } catch (err) {
      console.error('Error starting scanner:', err);
      setIsScanning(false);
    }
  };

  const handleQrCodeScan = (decodedText: string) => {
    setScannedResult(decodedText);
    if (decodedText.startsWith('http')) {
      setTimeout(() => {
        window.location.href = decodedText;
      }, 1000);
    }
  };

  const handleScannerDialog = async (open: boolean) => {
    setShowScanner(open);
    if (!open && html5QrCode.current) {
      try {
        if (html5QrCode.current.isScanning) {
          await html5QrCode.current.stop();
        }
        html5QrCode.current = null;
        setScannedResult("");
        setIsScanning(false);
      } catch (error) {
        console.error("Failed to stop scanner:", error);
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

      <div className="flex gap-4">
        {/* QR Code Scanner Dialog */}
        <Dialog onOpenChange={handleScannerDialog}>
          <DialogTrigger asChild>
            <Button 
              className="rounded-xl px-8 flex gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => setTimeout(startScanner, 500)}
            >
              <Scan size={20} />
              Get Started by Scanning QR
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Get Started</DialogTitle>
              <DialogDescription>
                Use your device's camera to scan a restaurant's QR code. Once scanned, you'll be redirected to the main page.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <div 
                id="qr-reader"
                className="w-full h-[300px] max-w-sm mx-auto overflow-hidden rounded-lg bg-gray-50"
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