export class FirestoreError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "FirestoreError";
  }
}

export class FirestoreNotFoundError extends FirestoreError {
  constructor(resource: string, id?: string) {
    super(
      id ? `${resource} with id ${id} not found` : `${resource} not found`,
      "NOT_FOUND"
    );
    this.name = "FirestoreNotFoundError";
  }
}

export class FirestoreValidationError extends FirestoreError {
  constructor(message: string, public field?: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "FirestoreValidationError";
  }
}

export class FirestorePermissionError extends FirestoreError {
  constructor(message: string = "Permission denied") {
    super(message, "PERMISSION_DENIED");
    this.name = "FirestorePermissionError";
  }
}

