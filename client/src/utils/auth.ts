import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  username: string;
  exp: number;
}

class AuthService {
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  login(token: string): void {
    localStorage.setItem('jwt_token', token);
    window.location.assign('/'); // Redirect to the main board page
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();
