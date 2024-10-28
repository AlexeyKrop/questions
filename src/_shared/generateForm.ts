import {EFormFieldType, IPagesForm} from "./interfaces/IFormField.ts";

export const generateForm = (): IPagesForm => {
    return {
        globalTimer: {
            enabled: true,
            timeSec: 10,
        },
        pages: [
            {
                id: 'question_1',
                title: 'Какое из этих животных является самым крупным на планете?',
                fields: [
                    {
                        id: 'animals',
                        type: EFormFieldType.radio,
                        required: true,
                        radioParams: {
                            items: [
                                {
                                    id: 'elephant',
                                    content: 'Слон',
                                },
                                {
                                    id: 'blue_whale',
                                    content: 'Голубой кит',
                                },
                                {
                                    id: 'giraffe',
                                    content: 'Жираф',
                                }
                            ]
                        },
                    }
                ],
                navigationLabel: 'Вопрос 1'
            },
            {
                id: 'question_2',
                title: 'Выберите планеты Солнечной системы:',
                fields: [
                    {
                        id: 'planets',
                        type: EFormFieldType.checkbox,
                        isMultiValue: true,
                        required: true,
                        checkboxParams: {
                            items: [
                                {
                                    id: 'mars',
                                    content: 'Марс',
                                },
                                {
                                    id: 'pluto',
                                    content: 'Плутон',
                                },
                                {
                                    id: 'venus',
                                    content: 'Венера',
                                },
                                {
                                    id: 'moon',
                                    content: 'Луна'
                                }
                            ]
                        },
                    }
                ],
                navigationLabel: 'Вопрос 2'
            },
            {
                id: 'question_3',
                title: 'Назовите столицу России:',
                fields: [
                    {
                        id: 'russia_capital',
                        type: EFormFieldType.input,
                        required: true,
                    }
                ],
                navigationLabel: 'Вопрос 3'
            },
            {
                id: 'question_4',
                title: 'Выберите правильное математическое утверждение:',
                fields: [
                    {
                        id: 'math',
                        type: EFormFieldType.radio,
                        required: true,
                        radioParams: {
                            items: [
                                {
                                    id: 'statement_1',
                                    content: '2 + 2 = 5',
                                },
                                {
                                    id: 'statement_2',
                                    content: '3 × 3 = 9',
                                },
                                {
                                    id: 'statement_3',
                                    content: '10 ÷ 2 = 3'
                                }
                            ]
                        },
                    }
                ],
                navigationLabel: 'Вопрос 4'
            },
            {
                id: 'question_5',
                title: 'Опишите своё любимое время года и почему:',
                fields: [
                    {
                        id: 'favorite_season',
                        type: EFormFieldType.textarea,
                    }
                ],
                navigationLabel: 'Вопрос 5'
            }
        ]
    }
}