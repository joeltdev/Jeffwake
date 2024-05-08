function generateOTP(length) {
  const characters = "0123456789";
  const OTP = [];
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    OTP.push(characters[index]);
  }
  return OTP.join("");
}

// Example usage:
const OTP = generateOTP(6); // Generates a 6-digit OTP
console.log(OTP); // Output the generated OTP
