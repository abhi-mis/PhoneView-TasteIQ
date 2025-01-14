import React from "react";
import { Textarea } from "../ui/textarea";

const ReviewForm = () => {
  return (
    <Textarea
      className="bg-primary-foreground text-muted-foreground h-[100px] resize-none"
      placeholder="Write a review (optional)"
    />
  );
};

export default ReviewForm;
