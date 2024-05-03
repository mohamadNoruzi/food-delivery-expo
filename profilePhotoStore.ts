import { create } from "zustand";

interface PhotoState {
  imgURI: string;
  addPhoto: (uri: string) => void;
}

const useProfileStore = create<PhotoState>()((set) => ({
  imgURI: "",
  addPhoto: (uri) => set(() => ({ imgURI: uri })),
}));

export default useProfileStore;
