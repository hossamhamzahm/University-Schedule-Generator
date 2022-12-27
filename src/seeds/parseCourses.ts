import fs from "fs";
import path from "path";
import readline from "readline";
import { Section } from "../model/section";


const file_path = path.join(__dirname, "data.txt");
const readStream = fs.createReadStream(file_path, "utf-8");
const rl = readline.createInterface({
	input: readStream,
	crlfDelay: Infinity,
});




let sections: Section[] = [];
let cnt = 0;

let course: Section = {
	course_code: "",
	course_name: "",
	section_name: "",
	section_type: "",
	section_day: "",
	section_from: "",
	section_to: "",
	instructor_name: "",
};



const sectionRex = new RegExp("[Section:] ([0-9]{0,2}[A-Z]?) | Session");
const typeRex = new RegExp(".*[Subtype:] ([a-zA-z]*)");
// 10:30 AM - 12:29 PM



let parse = async (): Promise<Section[]> => {
	for await (const line of rl) {
        if(line.startsWith('ECEN')) cnt = 0;
		switch (cnt) {
			case 0:
				course.course_code = line.split(": ")[0];
				course.course_name = line.split(": ")[1];
				break;
			case 1:
                // @ts-ignore
                course.section_name = line.match(sectionRex)[1].trim();
                // @ts-ignore
                course.section_type = line.match(typeRex)[1].trim();
                break;
			case 2:
				break;
			case 3:
				// 10:30 AM - 12:29 PM
				let from = line.split(" - ")[0];
				let to = line.split(" - ")[1];

				if (to.split(" ")[1] == "PM") {
					let splitted_to = to.split(":");
					if (parseInt(splitted_to[0]) < 12) splitted_to[0] = String(parseInt(splitted_to[0]) + 12);
					to = splitted_to[0] + ":" + splitted_to[1];
				}
				if (from.split(" ")[1] == "PM") {
					let splitted_from = from.split(":");
					if (parseInt(splitted_from[0]) < 12) splitted_from[0] = String(parseInt(splitted_from[0]) + 12);
					from = splitted_from[0] + ":" + splitted_from[1];
				}

				to = to.split(" ")[0];
				from = from.split(" ")[0];
				course.section_to = to;
				course.section_from = from;
				break;
			case 4:
				break;
			case 5:
				course.section_day = line.trim();
				break;
			case 8:
				course.instructor_name = line.trim();
				break;
			case 9:
				sections.push(JSON.parse(JSON.stringify(course)));
			default:
				cnt++;
				continue;
		}
		cnt++;
	}


	return sections;
};

export default parse;