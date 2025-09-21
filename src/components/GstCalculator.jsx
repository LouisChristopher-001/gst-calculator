import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper
} from "@mui/material";

export default function GstCalculator() {
  const [valueInclusive, setValueInclusive] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [result, setResult] = useState(null);

  const convertGST = () => {
    const value = parseFloat(valueInclusive);
    if (isNaN(value) || !gstRate) {
      setResult("⚠️ Please enter a value and select GST rate.");
      return;
    }

    let baseValue = value / (1 + gstRate / 100);
    let newRate;

    if (gstRate === 28) {
      newRate = 18;
    } else if (gstRate === 12) {
      newRate = 5;
    } else if (gstRate === 18) {
      newRate = 5;
    } else {
      setResult("❌ Conversion rule not defined for this GST rate.");
      return;
    }

    let newInclusive = baseValue * (1 + newRate / 100);

    setResult(
      <>
        <Typography>Customer Value (Inclusive): ₹{value.toFixed(2)}</Typography>
        <Typography>Old GST Rate: {gstRate}%</Typography>
        <Typography>Base Value (Exclusive): ₹{baseValue.toFixed(2)}</Typography>
        <Typography>New GST Rate: {newRate}%</Typography>
        <Typography fontWeight="bold">
          New Value (Inclusive): ₹{newInclusive.toFixed(2)}
        </Typography>
      </>
    );
  };

  return (
    <Container maxWidth="sm">
      {/* Logo */}
      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <img
          src="/logo.png" // place your logo in public/logo.png
          alt="Logo"
          style={{ height: 60 }}
        />
      </Box>

      {/* Product Line Text */}
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ mt: 2, mb: 2, fontWeight: 600, color: "#444" }}
      >
        AC | DISHWASHER | TV ABOVE 40" | COOKER | COOKWARE
      </Typography>

      {/* Calculator Box */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          GST Converter Calculator
        </Typography>

        {/* Value Input */}
        <TextField
          fullWidth
          type="number"
          label="Enter Value (Inclusive of GST)"
          variant="outlined"
          value={valueInclusive}
          onChange={(e) => setValueInclusive(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* GST Dropdown */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select GST Rate</InputLabel>
          <Select
            value={gstRate}
            label="Select GST Rate"
            onChange={(e) => setGstRate(e.target.value)}
          >
            <MenuItem value={28}>28%</MenuItem>
            <MenuItem value={12}>12%</MenuItem>
          </Select>
        </FormControl>

        {/* Convert Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={convertGST}
        >
          Convert
        </Button>

        {/* Result */}
        {result && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #1976d2",
              borderRadius: 2,
              backgroundColor: "#f0f8ff"
            }}
          >
            {result}
          </Box>
        )}
      </Paper>
    </Container>
  );
}
