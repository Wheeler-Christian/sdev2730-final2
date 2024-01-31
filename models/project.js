export class Project {
  constructor(title, description, status, imageUri, location, id) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.83247, lng: 2.483 }
    this.id = id;
  }
}

export const ProjectStatus = {
  suggested: 0,
  started: 1,
  completed: 2,
  rejected: 3,
  abandoned: 4,
};
