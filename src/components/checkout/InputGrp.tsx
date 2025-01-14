import React from "react";
import { Button } from "../ui/button";
import InSearch from "../common/InSearch";

interface InputItem {
  placeholder: string;
  buttonText?: string;
}

interface InputGrpProps {
  inputs: InputItem[];
}

const InputGrp = ({ inputs }: InputGrpProps) => {
  return (
    <div className="grid gap-4">
      {inputs.map((input, index) => (
        <div key={index} className="flex items-center">
          <InSearch
            placeholder={input.placeholder}
            className="rounded-xl"
            icon={index === 1 ? true : false}
            iconValue={
              <Button
                variant="link"
                className="absolute right-3 top-1/2 w-4 md:w-5 -translate-y-1/2 transform text-green-400 text-xs"
              >
                {input.buttonText}
              </Button>
            }
          />
        </div>
      ))}
    </div>
  );
};

export default InputGrp;
