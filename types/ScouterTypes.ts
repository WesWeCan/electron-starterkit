export interface Profile {

    id: number | string;
    profileName: string;
    // merk: string;
    // model: string;
    // variant: string;
    // fuel: string[];
    // typeSeller: string;
    // transmission: string[];
    // options: string[];
    // buildYear: {
    //     from: number | undefined;
    //     to: number | undefined;
    // };
    // price: {
    //     from: number | undefined;
    //     to: number | undefined;
    // };
    // KM: {
    //     from: number | undefined;
    //     to: number | undefined;
    // };

    version: number;

    linkNL: string;
    linkDE: string;
    
    mathConstants: mathConstants;
}


export interface CarData {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    seller: string;
    link: string;
    details: string[];
    image: string;
}

export interface CarDataCombined {
    profileID: string | number;
    carDataDE: CarData[];
    carDataNL: CarData[];
}

export interface mathConstants {
    nlBTW: number;
    deBTW: number;
    deExtraCosts: number;
    BPM: number;
    RDW: number;
    gapThreshold: number;
}

export interface ProfileData {
    profiles: Profile[];
    currentProfile: Profile | null;
}


export interface SocketCommunication {
    latestMessage: string;
    namedMessage: NamedMessage;
}

type NamedMessage = {
    [key: string]: string;
};

export interface DataManager {
    selectedIndex: number;
    biggestList: number;
}