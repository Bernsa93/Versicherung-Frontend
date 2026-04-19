# API

Base URL: /api/premium

Endpoints:

POST /calculate
Body:
{
  "annualMileage": number,
  "vehicleType": string,
  "zipCode": string
}

Response:
{
  "premium": number
}

POST /ai-classify
Body:
{
  "description": string
}

Response:
{
  "suggestedVehicleType": string,
  "description": string,
  "reason": string
}
