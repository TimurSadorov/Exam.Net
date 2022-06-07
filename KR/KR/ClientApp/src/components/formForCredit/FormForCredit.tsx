import QuestionnaireInfoDto from "../../dto/QuestionnaireInfoDto";
import {Button, Form} from "react-bootstrap";
import useForm from "../../hook/form/useForm";
import ValidationInput from "../common/validationInput/ValidationInput";
import {maxLength, maxValue, minValue, pattern, period, required} from "../../validations/validations";
import {EmploymentType} from "../../dto/EmploymentType";
import {GoalType} from "../../dto/GoalType";
import {InformationAboutPledge} from "../../dto/InformationAboutPledge";
import {Input} from "reactstrap";
import axios from "axios";
import useModalWindow from "../../hook/modal/useModalWindow";
import ModalWindow from "../common/modal/ModalWindow";

function FormForCredit(){
    const formInfo = useForm<QuestionnaireInfoDto>({
        fullName: {firstName: "", secondName: "", patronymic: ""},
        age: 0,
        creditAmount: 0,
        employmentType: EmploymentType.unemployed,
        informationAboutPledge: InformationAboutPledge.realty,
        otherCredits: false,
        goal: GoalType.consumerCredit,
        isJudging: false,
        passportDetails: {
            dateOfIssue: new Date(),
            number: "",
            issuedByWhom: "",
            registrationInformation: "",
            series: ""
        }
    });
    const notificationAboutCredit = useModalWindow();
    
    function calculateCredit(){
        axios.post("credit/calculate", formInfo.form.current).then(response => {
            let responseData = response.data;
            if (responseData.isApproved){
                notificationAboutCredit.setMessageText(`Кредит одобрен! Баллы: ${responseData.scores}.
                 Ставка по кредиту: ${responseData.interestOnLoan}`);
            } else {
                notificationAboutCredit.setMessageText(`Кредит не одобрен! Баллы: ${responseData.scores}.`);
            }

            notificationAboutCredit.setMessageIsShow(true);
        });
    }
    
    return (
        <>
            <ModalWindow modalControl={notificationAboutCredit} headerText="Информация по кредиту"/>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center h2">
                    Анкета
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-column mt-3">
                        <div className="h5">ФИО</div>
                        <div className="d-flex mt-2 justify-content-between">
                            <div className="col-2">
                                <ValidationInput initialValue={""}
                                                 validations={[required, maxLength(50)]}
                                                 name={"Имя"}
                                                 formInfo={formInfo}
                                                 setFieldForm={(form, value) => form.fullName.firstName = value}
                                                 typeInput="text"/>
                            </div>
                            <div className="col-2">
                                <ValidationInput initialValue={""}
                                                 validations={[required, maxLength(50)]}
                                                 name={"Фамилия"}
                                                 formInfo={formInfo}
                                                 setFieldForm={(form, value) => form.fullName.secondName = value}
                                                 typeInput="text"/>
                            </div>
                            <div className="col-2">
                                <ValidationInput initialValue={""}
                                                 validations={[maxLength(50)]}
                                                 name={"Отчество"}
                                                 formInfo={formInfo}
                                                 setFieldForm={(form, value) => form.fullName.patronymic = value}
                                                 typeInput="text" isRequired={false}/>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column mt-4">
                        <div className="h5">Паспортные данные</div>
                        <div className="d-flex flex-column">
                            <div className="d-flex mt-2 justify-content-between">
                                <div className="col-2">
                                    <ValidationInput initialValue={""}
                                                     validations={[pattern(/^[0-9]{4}$/, "XXXX, где X-цифра"), required]}
                                                     name={"Серия"}
                                                     formInfo={formInfo}
                                                     setFieldForm={(form, value) => form.passportDetails.series = value}
                                                     typeInput="text"/>
                                </div>
                                <div className="col-2">
                                    <ValidationInput initialValue={""}
                                                     validations={[pattern(/^[0-9]{6}$/, "XXXXXX, где X-цифра"), required]}
                                                     name={"Номер"}
                                                     formInfo={formInfo}
                                                     setFieldForm={(form, value) => form.passportDetails.number = value}
                                                     typeInput="text"/>
                                </div>
                                <div className="col-3">
                                    <ValidationInput initialValue={""}
                                                     validations={[maxLength(200), required]}
                                                     name={"Кем выдан"}
                                                     formInfo={formInfo}
                                                     setFieldForm={(form, value) => form.passportDetails.issuedByWhom = value}
                                                     typeInput="textarea"/>
                                </div>
                            </div>
                            <div className="d-flex mt-3 justify-content-between">
                                <div className="col-2">
                                    <ValidationInput initialValue={""}
                                                     validations={[required, ...period(new Date(1950, 0, 1), new Date())]}
                                                     name={"Дата выдачи"}
                                                     formInfo={formInfo}
                                                     setFieldForm={(form, value) => form.passportDetails.dateOfIssue = new Date(value)}
                                                     typeInput="date"/>
                                </div>
                                <div className="col-6">
                                    <ValidationInput initialValue={""}
                                                     validations={[maxLength(200), required]}
                                                     name={"Информация о прописке"}
                                                     formInfo={formInfo}
                                                     setFieldForm={(form, value) => form.passportDetails.registrationInformation = value}
                                                     typeInput="textarea"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"d-flex flex-column mt-4"}>
                        <div className="h5">Кредит</div>
                        <div className="d-flex flex-column">
                            <div className="d-flex mt-2 justify-content-between">
                                <div className="col-2">
                                    <ValidationInput initialValue={0}
                                                     validations={[minValue(21), maxValue(72)]}
                                                     name={"Возраст"}
                                                     formInfo={formInfo}
                                                     setFieldForm={(form, value) => form.age = value}
                                                     typeInput="number"/>
                                </div>
                                <div className="col-2">
                                    <ValidationInput initialValue={0}
                                                     validations={[minValue(0), maxValue(10_000_000)]}
                                                     name={"Сумма кредита"}
                                                     formInfo={formInfo}
                                                     setFieldForm={(form, value) => form.creditAmount = value}
                                                     typeInput="text"/>
                                </div>
                                <div className="col-3">
                                    <div>Был судим</div>
                                    <Input type="checkbox"  onChange={event => formInfo.form.current.isJudging = event.target.checked}/>
                                </div>
                            </div>
                            <div className="d-flex mt-3 justify-content-between">
                                <div className="col-3">
                                    <div>Цель</div>
                                    <Form.Select onChange={event => formInfo.form.current.goal = Number(event.target.value)}>
                                        <option value={GoalType.consumerCredit}>Потребительский кредит</option>
                                        <option value={GoalType.realty}>Недвижимость</option>
                                        <option value={GoalType.recrediting}>Перекредитование</option>
                                    </Form.Select>
                                </div>
                                <div className="col-3">
                                    <div>Трудоустройство</div>
                                    <Form.Select onChange={event => formInfo.form.current.employmentType = Number(event.target.value)}>
                                        <option value={EmploymentType.retiredPeople}>Пенсионер</option>
                                        <option value={EmploymentType.freelancer}>Фрилансер</option>
                                        <option value={EmploymentType.contract}>Договор ТК РФ</option>
                                        <option value={EmploymentType.individualEntrepreneur}>ИП</option>
                                        <option value={EmploymentType.unemployed}>Безработный</option>
                                    </Form.Select>
                                </div>
                                <div className="col-3">
                                    <div>Информация о залоге</div>
                                    <Form.Select onChange={event => formInfo.form.current.informationAboutPledge = Number(event.target.value)}>
                                        <option value={InformationAboutPledge.realty}>Недвижимость</option>
                                        <option value={InformationAboutPledge.carAgeLessThanThree}>Автомобиль, возраст меньше 3</option>
                                        <option value={InformationAboutPledge.carAgeMoreThanThree}>Автомобиль, возраст больше 3</option>
                                        <option value={InformationAboutPledge.guarantee}>Поручительство</option>
                                        <option value={InformationAboutPledge.none}>Нет</option>
                                    </Form.Select>
                                </div>
                            </div>
                            <div className="d-flex mt-3 justify-content-between">
                                <div>
                                    <div>Наличие других кредитов</div>
                                    <Input type="checkbox" onChange={event => formInfo.form.current.otherCredits = event.target.checked}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Button disabled={!formInfo.isValid} variant="outline-success"
                        onClick={calculateCredit} className="mt-4 col-2">Отправить</Button>
            </div>
        </>
    );
}

export default FormForCredit;