import FioDto from "./FioDto";
import PassportDetails from "./PassportDetails";
import {EmploymentType} from "./EmploymentType";
import {GoalType} from "./GoalType";
import {InformationAboutPledge} from "./InformationAboutPledge";

export default interface QuestionnaireInfoDto{
    fullName: FioDto;
    passportDetails: PassportDetails;
    age: number;
    isJudging: boolean;
    creditAmount: number;
    goal: GoalType;
    employmentType: EmploymentType;
    otherCredits: boolean;
    informationAboutPledge: InformationAboutPledge;
}