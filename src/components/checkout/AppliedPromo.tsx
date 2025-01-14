import { CheckCircle2Icon, X } from "lucide-react";
import React from "react";

const AppliedPromo = () => {
  return (
    <div className="w-full bg-background rounded-xl p-2">
      <div className="rounded-xl bg-green-100 p-2 flex justify-between items-center">
        <span className="text-xs flex items-center gap-2">
          <CheckCircle2Icon className="text-green-500" />
          <span className="text-sm text-green-500">Shake50 Applied</span>
        </span>
        <X />
      </div>
    </div>
  );
};

export default AppliedPromo;
