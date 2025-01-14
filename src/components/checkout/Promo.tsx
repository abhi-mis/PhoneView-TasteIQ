import { BadgePercent } from "lucide-react";
import React from "react";
import InSearch from "../common/InSearch";
import { Button } from "../ui/button";

const Promo = () => {
  return (
    <div className="grid gap-4 p-4 rounded-xl bg-background">
      <span className="text-sm items-center flex justify-center">
        <BadgePercent className="mr-2" />
        <span>Do you have any promo code?</span>
      </span>
      <InSearch
        placeholder="Enter promo code"
        className="rounded-xl"
        icon={true}
        iconValue={
          <Button
            variant="link"
            className="absolute right-3 top-1/2 w-4 md:w-5 -translate-y-1/2 transform text-green-400 text-xs"
          >
            Apply
          </Button>
        }
      />
    </div>
  );
};

export default Promo;
