import PaymentResult from '@/components/ui/checkout/PaymentResult';
import React from 'react'

const Payment = ({ params }: { params: { transId: string } }) => {
    const transId = params?.transId;

  return <div>
    <PaymentResult transId={transId} />
  </div>;
};

export default Payment