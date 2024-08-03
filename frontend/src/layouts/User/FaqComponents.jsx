import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const FaqComponent = () => {
  const faqData = [
    {
      id: 1,
      question: "How can I place an order?",
      answer: (
        <>
          Thank you for choosing JKI EXPRESS! We're happy to show you how to
          order items on our site.
          <br />
          <br />
          Step 1: Please register for a JKI EXPRESS account.
          <br />
          <br />
          Step 2: Choose the item and click on the [add to Cart] button.
          <br />
          <br />
          Step 3: View CART and check out with your debit Paypal
        </>
      ),
    },
    {
      id: 2,
      question: "How do I cancel my order?",
      answer: (
        <>
          You can cancel your order on the 'My Orders' page before it ships out.
          <br />
          <br />
          Note:
          <br />
          <br />
          1. We're not able to cancel an order that has been shipped. We
          recommend you do a return for a refund with our return label.
          <br />
          <br />
          2. If the items you purchased are from different warehouses at the
          same time, there are two orders generated. If the 3 orders are
          enjoying same promotion activity, the other order will be canceled
          together if you cancel one of it.
        </>
      ),
    },
    {
      id: 3,
      question: "Why is my order taking longer to process than normal?",
      answer:
        "Once your order has been paid for, the warehouse needs few days to process it. However, certain items within your order may require longer-than-normal processing times, which could result in a later shipping time on your overall order.",
    },
    {
      id: 4,
      question: "How can I add an item to my wishlist?",
      answer: `You can save an item to your 'Wishlist' by hitting the '♡' button on the product details page.`,
    },
    {
      id: 5,
      question: "Why do we sign you up for an online account?",
      answer: (
        <>
          Registeration is necessary for order placing.
          <br />
          <br />
          Create an account at JKI EXPRESS to enjoy personalized service:
          <br />
          <br />
          1. To be the first to know about our latest sales and special events.
          <br />
          <br />
          2. To be notified in time of any information about your orders.
        </>
      ),
    },
  ];

  return (
    <div className="faq-container">
      <h1 className="text-center mb-5">Frequently Asked Questions</h1>
      <Collapse accordion>
        {faqData.map((item) => (
          <Panel header={item.question} key={item.id}>
            <p>{item.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FaqComponent;
