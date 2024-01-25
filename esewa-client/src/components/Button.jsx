import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

export default function BasicButtons() {
  const handleEsewaPayment = async () => {
    const url = "http://localhost:3000/api/create/order";
    const data = {
      amount: 100,
      products: [{ product: "test", amount: 100, quantity: 1 }],
    };
    try {
      const response = await axios.post(url, data);
      console.log(response?.data?.formData);
      if (response?.status === 200) {
        esewaCall(response?.data?.formData);
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const esewaCall = (formData) => {
    console.log(formData);
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" color="success" onClick={handleEsewaPayment}>
        Handle esewa payment
      </Button>
    </Stack>
  );
}
