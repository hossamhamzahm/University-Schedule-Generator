import SectionInterface from "./section"

interface DayInterface {
    day_id?: number;
    hour_1_section_id: number;
    hour_2_section_id: number;
    hour_3_section_id: number;
    hour_4_section_id: number;
    hour_5_section_id: number;
    hour_6_section_id: number;
    hour_7_section_id: number;
    hour_8_section_id: number;
    hour_9_section_id: number;
    hour_10_section_id: number;
    hour_11_section_id: number;
    hour_12_section_id: number;
}


interface DayPopulated {
    day_id?: number;
    hour_1_section: SectionInterface | null;
    hour_2_section: SectionInterface | null;
    hour_3_section: SectionInterface | null;
    hour_4_section: SectionInterface | null;
    hour_5_section: SectionInterface | null;
    hour_6_section: SectionInterface | null;
    hour_7_section: SectionInterface | null;
    hour_8_section: SectionInterface | null;
    hour_9_section: SectionInterface | null;
    hour_10_section: SectionInterface | null;
    hour_11_section: SectionInterface | null;
    hour_12_section: SectionInterface | null;
}



export {
    DayInterface,
    DayPopulated,

}