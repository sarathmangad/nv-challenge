export class User {
    id: number;
    firstName = '';
    lastName = '';
    birthDate = '';
    country = '';
    image = '';
    status = '';

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
