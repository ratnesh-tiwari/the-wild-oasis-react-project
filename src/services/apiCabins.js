import supabase, { supabaseUrl } from "./superbase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabinObject, id) {
  const hasImagePath = newCabinObject.image?.startsWith?.(supabaseUrl);
  // Create image path
  const imageName = `${Math.random()}-${newCabinObject.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabinObject.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // const imagePath = `https://gbwqndgefhxxjdvkqxxn.supabase.co/storage/v1/object/public/avatars/cabin-001.jpg`;

  // Create cabin
  let query = supabase.from("cabins");

  if (!id)
    // Upload Data
    query = query.insert([{ ...newCabinObject, image: imagePath }]);

  // Edit cabin
  if (id)
    query = query.update({ ...newCabinObject, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabinObject.image);
  // 3. Delete the cabin if there was an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabins image could not be upload and cabin could not be created"
    );
  }

  return data;
}
