export class User {
    id: number;
    firstName = '';
    lastName = '';
    birthDate = '';
    country = '';
    image = '';
    status = '';
    phoneNumber = '';

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
