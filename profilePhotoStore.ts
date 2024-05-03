import { create } from "zustand";

interface PhotoState {
  imgURI: string;
  addPhoto: (uri: string) => void;
  removePhoto: () => void;
}

const useProfileStore = create<PhotoState>()((set) => ({
  imgURI: "",
  addPhoto: (uri) => set(() => ({ imgURI: uri })),
  removePhoto: () => set(() => ({ imgURI: "" })),
}));

export default useProfileStore;
