import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  register(user: any): void {
    let users = this.getRegisteredUsers();
    users.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }

  validateLogin(firstName: string, password: string): boolean {
    const users = this.getRegisteredUsers();
    const user = users.find((u: any) => u.firstName === firstName && u.password === password);
    return !!user;
  }

  private getRegisteredUsers(): any[] {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  }
  
}
