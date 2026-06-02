"use server";

import { collectionService } from "@/server/services/collection.service";

export async function getUserCollectionsAction() {
  return collectionService.getForCurrentUser();
}

export async function createCollectionAction(input: unknown) {
  return collectionService.create(input);
}

export async function updateCollectionAction(input: unknown) {
  return collectionService.update(input);
}

export async function deleteCollectionAction(collectionId: unknown) {
  return collectionService.delete(collectionId);
}
