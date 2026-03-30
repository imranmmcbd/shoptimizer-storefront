const handlePlaceOrder = async () => {
    if (!formData.name || !formData.phone || !formData.district || !formData.thana || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email,
          district: formData.district,
          thana: formData.thana,
          address_line: formData.address,
          notes: formData.notes,
          payment_method: "cod",
          items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Order failed");

      localStorage.setItem("shoptimizer_latest_order", JSON.stringify({
        orderId: data.order?.order_number,
        items,
        totalAmount: totalAmount + shippingFee,
        shippingFee,
        shippingDetails: formData,
        status: "placed",
        createdAt: new Date().toISOString()
      }));

      clearCart();
      router.push("/order-success");

    } catch (error: any) {
      alert(error.message || "Failed to place order. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
