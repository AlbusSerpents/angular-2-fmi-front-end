interface LoginRequest {
  username: string;
  password: string;
}

interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  username: string;
}

interface AuthenticationResponse {
  id: string;
  name: string;
  email: string;
  username: string;
}
