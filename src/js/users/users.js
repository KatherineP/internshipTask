class User {
  constructor(name) {
    this.name = name;
    this.permissions = [];
  }
  can(action) {
    return this.permissions.includes(action);
  }
}
class Admin extends User {
  constructor(name) {
    super(name);
    this.permissions = ['create-event', 'drag', 'delete'];
  }
}
export { User, Admin };
