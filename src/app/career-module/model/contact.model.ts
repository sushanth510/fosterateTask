export class contact {
id: number;
name: string;
email: string;
mobile: number;
landline: number;
website: string;
address: string;
constructor(obj:object)
  {
      this.id=obj["id"];
      this.name=obj["name"];
      this.email=obj["email"];
      this.mobile=obj["mobile"];
      this.landline=obj["landline"];
      this.website=obj["website"];
      this.address=obj["address"];
  }
}
