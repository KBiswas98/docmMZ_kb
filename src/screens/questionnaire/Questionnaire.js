import React, { useEffect, useState, useRef } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, ColorPropType, ActivityIndicator, TouchableOpacity } from 'react-native'
import TopNavbar from '../../components/prefab/TopNavbar/TopNavbar2'
import Button from '../../components/primitive/Button/Button'
import {color} from '../../config/styles/color'
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux'
import { gettingQuestion } from '../../redux/action/questionAction'

const Questionnaire = (props) => {
    const placeRef = useRef(null)

    const {isQuestionLoading, questions} = useSelector(state => state.QuestionReducer)
    const dispatch = useDispatch()
    const [linkedquestions, setLinkedquestions] = useState(null)

    useEffect(() => {
        dispatch(gettingQuestion())
        console.log(questions.question)
    },[])

    const addQuestion = (qs,val) => {
        console.log('addQuestion',val)

        switch(qs) {
            case 'txt': 
                setLinkedquestions([linkedquestions, <Question data={val} add={addQuestion}/>])
            deafult: 
                null
        }
    }

    return (isQuestionLoading ? <ActivityIndicator size="large" color="#000" style={{ display: 'flex', flex: 1, justifyContent: "center", alignItems: "center"}}/> :
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1}}>
            {/* <ScrollView > */}
                < View style = {
                    {
                        paddingBottom: 10,
                        marginLeft: 30,
                        marginTop: 30,
                        display: 'flex',
                        textAlign: "center"
                        ,flexDirection: 'row',
                        alignItems: "center",
                    }
                } >
                    <Icon
                        name="ios-arrow-round-back"
                        color={color.brand_color}
                        size={35}
                        onPress={() => props.navigation.goBack(null)}
                    />
                    <Text style={{marginLeft: '32%', fontSize: 20}}>DocMz</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.point_holder}>
                        {
                            questions.question.map( item => (
                                <Spiner active={true}/>
                            ))
                        }
                        {/* <Spiner active={false}/> */}
                    </View>
                    <ScrollView style={styles.wrapper}>
                        <View ref={placeRef}>
                            {/* For Array of questions we have to use loop */}
                            {
                                questions.question.map(qs => <Question data={qs} add={addQuestion} />)
                                
                            }
                            {
                                linkedquestions
                            }
                        </View>
                    </ScrollView>
                    <View>
                        <View
                            style={styles.action_controller}>
                            <Button
                                style={{ paddingTop: 20}}
                                deafult={true}
                                title={'SKIP'}
                                t_text={true}
                                onlyBorder
                                onClick={() =>
                                props.navigation.navigate(
                                    'Auth',
                                    {},
                                    NavigationActions.navigate({routeName: 'SignUp'}),
                                )
                                }
                            />
                            <Button
                                deafult={true}
                                title={'NEXT'}
                                normal
                                shadow
                            />
                        </View>
                    </View>
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
    },
    point_holder: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },  
    wrapper: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: color.background,
    },
    action_controller: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 40,
        marginTop: 20
    }
})

const Spiner = (props) => (
    <View style={[{ height: 6, width: 6, borderRadius: 100, margin: 10}, props.active ? { backgroundColor: color.back_color} : {backgroundColor: color.text_on_bg}]}>

    </View>
)


const Question = ({data, add}) => {
    useEffect(() => {
        console.log('From Question.')
        console.log(data)
    })
    return (
        <View>
            <Text>{data.title}</Text>
            <InputGenerator option={data.option} add={add} />
        </View>
    )
}

const InputGenerator = ({option, add}) => {
    useEffect(() => {
        console.log('From InputGenerator')
        console.log(option)
    })
    return (
        <View style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5}}>
            {
                option.map(op => {
                    switch(op.optionType) {
                        case 'text':
                            return (
                                <Select option={op} add={add} />
                            )
                        default:
                            return null
                    }
                })
            }
        </View>
    )
}

const Select = ({option, add}) => {
    useEffect(() => {
        console.log('From Select')
        console.log(option)
    },[])

    const showLinkedQuestion = () => {
        if (option.linkedQuestion === null || option.linkedQuestion === undefined) return;
        option.linkedQuestion.map( qs1 => {
            add('txt', qs1 )
        })
        // rrf.appendChild(c)
    }

    return (
        <TouchableOpacity style={{ margin: 3, borderWidth: 1, borderColor: color.text_on_bg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5}}
         onPress={() =>/* !option.linkedquestions ? null: */showLinkedQuestion()}>
            <Text style={{color: color.text_on_bg, textTransform: 'capitalize', fontSize: 12}}>{option.text}</Text>
        </TouchableOpacity>
    )
}



export default Questionnaire
