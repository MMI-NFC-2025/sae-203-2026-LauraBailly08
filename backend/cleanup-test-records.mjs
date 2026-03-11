import PocketBase from 'pocketbase';

const pb = new PocketBase('https://lafanfacomtoise.bailly-laura.fr');
const jobs = [
  ['artiste', 'uy8amb8wy5vqak7'],
  ['scene', 'p7ao0suclyxltw0'],
  ['contact', '5528drx8nz4hvic'],
];

for (const [collection, id] of jobs) {
  try {
    await pb.collection(collection).delete(id);
    console.log('deleted', collection, id);
  } catch (error) {
    const msg = error && error.message ? error.message : String(error);
    console.log('delete-failed', collection, id, msg);
  }
}
