import React from "react";
import PageHeader from "../../../../components/PageHeader/PageHeader";

const headerButtons = [
  {
    text: "GO BACK",
    type: "red",
    url: "/admin/payments"
  }
];
const PaymentReview = props => {
  const { match } = props;
  const claimID = match.params.id;
  return (
    <div>
      <PageHeader title="Review Payment" buttons={headerButtons} />
      <h1>Payment Review: {claimID}</h1>
    </div>
  );
};

export default PaymentReview;
