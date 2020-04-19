import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ColorPropType,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Button from '../../components/primitive/Button/Button';
import {color} from '../../config/styles/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {
  gettingQuestion,
  saveAnswer,
  resetQuestion,
  doneQuestion,
} from '../../redux/action/questionAction';
import {compose} from 'redux';

// const Questionnaire = props => {
//   const placeRef = useRef(null);

//   const {isQuestionLoading, questions} = useSelector(
//     state => state.QuestionReducer,
//   );
//   const dispatch = useDispatch();
//   const [linkedquestions, setLinkedquestions] = useState(null);
//   const [questionNumber, setQuestinNumber] = useState(0);

//   useEffect(() => {
//     dispatch(gettingQuestion());
//     // console.log(questions.question)
//   }, []);

//   const addQuestion = (qs, val) => {
//     console.log('addQuestion', val);

//     switch (qs) {
//       case 'txt':
//         setLinkedquestions([
//           linkedquestions,
//           <Question data={val} add={addQuestion} />,
//         ]);
//         break;
//       case 'input':
//         setLinkedquestions([linkedquestions, <TextInput />]);
//         break;
//     }
//   };

//   const incrementQuestionNumber = () => {
//     questions.question.length - 1 > questionNumber &&
//       setQuestinNumber(questionNumber + 1);
//     setLinkedquestions(null);
//   };

//   const decrementQuestionNumber = () => {
//     1 <= questionNumber && setQuestinNumber(questionNumber - 1);
//     setLinkedquestions(null);
//   };

//   const checkAlreadyAdd = id => {};

//   return isQuestionLoading ? (
//     <ActivityIndicator
//       size="large"
//       color="#000"
//       style={{
//         display: 'flex',
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     />
//   ) : (
//     <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
//       {/* <ScrollView > */}
//       <View
//         style={{
//           paddingBottom: 10,
//           marginLeft: 30,
//           marginTop: 30,
//           display: 'flex',
//           textAlign: 'center',
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}>
//         <Icon
//           name="ios-arrow-round-back"
//           color={color.brand_color}
//           size={35}
//           onPress={() => props.navigation.goBack(null)}
//         />
//         <Text style={{marginLeft: '32%', fontSize: 20}}>DocMz</Text>
//       </View>
//       <View style={styles.container}>
//         <View style={styles.point_holder}>
//           {questions.question.map((item, index) => (
//             <Spiner
//               active={true}
//               index={index}
//               activeQuestion={questionNumber}
//             />
//           ))}
//           {/* <Spiner active={false}/> */}
//         </View>
//         <ScrollView style={styles.wrapper}>
//           <View ref={placeRef}>
//             {/* For Array of questions we have to use loop */}
//             {/* {questions.question.map(qs => ( */}
//             <Question
//               data={questions.question[questionNumber]}
//               add={addQuestion}
//             />
//             {/* ))} */}
//             {linkedquestions}
//           </View>
//         </ScrollView>
//         <View>
//           <View style={styles.action_controller}>
//             <Button
//               style={{paddingTop: 20}}
//               deafult={true}
//               title={'SKIP'}
//               t_text={true}
//               onlyBorder
//               onClick={() =>
//                 /*incrementQuestionNumber()*/ decrementQuestionNumber()
//               }
//             />
//             <Button
//               deafult={true}
//               title={'NEXT'}
//               normal
//               shadow
//               onClick={() => incrementQuestionNumber()}
//             />
//           </View>
//         </View>
//       </View>
//       {/* </ScrollView> */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     margin: 20,
//     flex: 1,
//   },
//   point_holder: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   wrapper: {
//     borderRadius: 20,
//     padding: 20,
//     backgroundColor: color.background,
//   },
//   action_controller: {
//     display: 'flex',
//     flexDirection: 'row',
//     flex: 1,
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     marginBottom: 40,
//     marginTop: 20,
//   },
// });

// const Spiner = props => (
//   <View
//     style={[
//       {height: 6, width: 6, borderRadius: 100, margin: 10},
//       props.activeQuestion >= props.index
//         ? {backgroundColor: color.back_color}
//         : {backgroundColor: color.text_on_bg},
//     ]}
//   />
// );

// const Question = ({data, add}) => {
//   useEffect(() => {
//     console.log('From Question.');
//     console.log(data);
//   });
//   return (
//     <View>
//       <Text>{data.title}</Text>
//       <InputGenerator option={data.option} add={add} title={data.title} />
//     </View>
//   );
// };

// const InputGenerator = ({option, add, title}) => {
//   useEffect(() => {
//     console.log('From InputGenerator');
//     console.log(option);
//   });
//   return (
//     <View
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         marginVertical: 5,
//       }}>
//       {option.map(op => {
//         switch (op.optionType) {
//           case 'text':
//             return <Select option={op} add={add} title={title} />;
//           case 'radio':
//             return <Select option={op} add={add} title={title} />;
//           case 'checkbox':
//             return <MyInput add={add} title={title} option={op} />;
//           default:
//             return null;
//         }
//       })}
//     </View>
//   );
// };

// const MyInput = ({add, title, option}) => {
//   const [selected, setSelected] = useState(true);

//   useEffect(() => {
//     console.log('-------------------------------------');
//     console.log(option);
//     console.log('-------------------------------------');
//   }, []);

//   return (
//     <View
//       style={{
//         margin: 10,
//         display: 'flex',
//         flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//       }}>
//       <Text>{option.text}</Text>
//       <View>
//         <TouchableOpacity
//           style={{
//             width: 18,
//             height: 18,
//             borderRadius: 100,
//             borderWidth: 1,
//             borderColor: color.brand_color,
//           }}
//           onPress={() => setSelected(!selected)}>
//           <Icon
//             name="ios-checkmark"
//             size={25}
//             color={color.brand_color}
//             style={{
//               position: 'absolute',
//               top: -5,
//               left: 3,
//               color: color.brand_colors,
//               opacity: selected ? 1 : 0,
//             }}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const Select = ({option, add, title}) => {
//   const dispatch = useDispatch();
//   const {answer} = useSelector(state => state.QuestionReducer);
//   const [isOpSelected, setIsSelected] = useState(false);

//   useEffect(() => {
//     console.log('From Select');
//     console.log(option);
//   }, []);

//   const showLinkedQuestion = () => {
//     setIsSelected(true);
//     const ans = {
//       id: option._id,
//       title: title,
//       ans: option.text,
//     };

//     //     console.log('-------------------------------------');
//     //     console.log(ans);
//     //     console.log('-------------------------------------');

//     dispatch(saveAnswer(ans));

//     if (option.linkedQuestion === null || option.linkedQuestion === undefined)
//       return;
//     option.linkedQuestion.map(qs1 => {
//       add('txt', qs1);
//     });
//     // rrf.appendChild(c)
//   };

//   return (
//     <TouchableOpacity
//       style={[
//         {
//           margin: 3,
//           borderWidth: 1,
//           borderColor: color.text_on_bg,
//           paddingHorizontal: 8,
//           paddingVertical: 3,
//           borderRadius: 5,
//         },
//         isOpSelected && {
//           backgroundColor: color.brand_color,
//         },
//       ]}
//       onPress={() =>
//         /* !option.linkedquestions ? null: */ showLinkedQuestion()
//       }>
//       <Text
//         style={[
//           !isOpSelected
//             ? {
//                 color: color.text_on_bg,
//                 textTransform: 'capitalize',
//                 fontSize: 12,
//               }
//             : {
//                 color: color.white_color,
//                 textTransform: 'capitalize',
//                 fontSize: 12,
//               },
//         ]}>
//         {option.text}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default Questionnaire;

const questions = {
  question: [
    {
      _id: '5e96f129e06d8c066f009951',
      root: true,
      option: [
        {
          linkedQuestion: [
            {
              _id: '5e96f18ee06d8c066f009955',
              root: false,
              option: [
                {
                  linkedQuestion: [],
                  _id: '5e96f18ee06d8c066f009958',
                  optionType: 'radio',
                  text: 'apple',
                },
                {
                  linkedQuestion: [],
                  _id: '5e96f18ee06d8c066f009957',
                  optionType: 'radio',
                  text: 'boy',
                },
                {
                  linkedQuestion: [],
                  _id: '5e96f18ee06d8c066f009956',
                  optionType: 'radio',
                  text: 'cat',
                },
              ],
              ansOptionType: 'single',
              superQuestion: false,
              title: 'Ques2',
              parent: '5e96f129e06d8c066f009951',
              optionText: 'a',
              speciality: 'Surgeaon',
              category: 'abcdef',
              createdAt: '2020-04-15T11:35:42.133Z',
              updatedAt: '2020-04-15T11:36:28.758Z',
              __v: 0,
            },
            {
              _id: '5e96f18ee06d8c066f009955',
              root: false,
              option: [
                {
                  linkedQuestion: [],
                  _id: '5e96f18ee06d8c066f009958',
                  optionType: 'radio',
                  text: 'aa',
                },
                {
                  linkedQuestion: [],
                  _id: '5e96f18ee06d8c066f009957',
                  optionType: 'radio',
                  text: 'ba',
                },
                {
                  linkedQuestion: [],
                  _id: '5e96f18ee06d8c066f009956',
                  optionType: 'radio',
                  text: 'ca',
                },
              ],
              ansOptionType: 'multiple',
              superQuestion: false,
              title: 'Quesccc',
              parent: '5e96f129e06d8c066f009951',
              optionText: 'a',
              speciality: 'Surgeaon',
              category: 'abcdef',
              createdAt: '2020-04-15T11:35:42.133Z',
              updatedAt: '2020-04-15T11:36:28.758Z',
              __v: 0,
            },
          ],
          _id: '5e96f129e06d8c066f009954',
          optionType: 'radio',
          text: 'ant',
        },
        {
          linkedQuestion: [
            {
              _id: '5e96f18ee06d8c066f009955',
              root: false,
              option: [
                //       {
                //         linkedQuestion: [],
                //         _id: '5e96f18ee06d8c066f009958',
                //         optionType: 'radio',
                //         text: 'a',
                //       },
                //       {
                //         linkedQuestion: [],
                //         _id: '5e96f18ee06d8c066f009957',
                //         optionType: 'radio',
                //         text: 'b',
                //       },
                //       {
                //         linkedQuestion: [],
                //         _id: '5e96f18ee06d8c066f009956',
                //         optionType: 'radio',
                //         text: 'c',
                //       },
              ],
              ansOptionType: 'inputBox',
              superQuestion: false,
              title: 'wht is your name',
              parent: '5e96f129e06d8c066f009951',
              optionText: 'a',
              speciality: 'Surgeaon',
              category: 'abcdef',
              createdAt: '2020-04-15T11:35:42.133Z',
              updatedAt: '2020-04-15T11:36:28.758Z',
              __v: 0,
            },
          ],
          _id: '5e96f129e06d8c066f009953',
          optionType: 'radio',
          text: 'ball',
        },
        {
          linkedQuestion: [],
          _id: '5e96f129e06d8c066f009952',
          optionType: 'radio',
          text: 'cow',
        },
      ],
      ansOptionType: 'single',
      superQuestion: false,
      title: 'Ques1',
      speciality: 'Surgeaon',
      createdAt: '2020-04-15T11:34:01.891Z',
      updatedAt: '2020-04-15T11:35:42.486Z',
      __v: 0,
    },
    {
      _id: '5e96f26ae06d8c066f009961',
      root: true,
      option: [
        {
          linkedQuestion: [],
          _id: '5e96f26ae06d8c066f009964',
          optionType: 'radio',
          text: 'a',
        },
        {
          linkedQuestion: [],
          _id: '5e96f26ae06d8c066f009963',
          optionType: 'radio',
          text: 'b',
        },
        {
          linkedQuestion: [],
          _id: '5e96f26ae06d8c066f009962',
          optionType: 'radio',
          text: 'c',
        },
      ],
      ansOptionType: 'multiple',
      superQuestion: false,
      title: 'Ques22',
      speciality: 'Surgeaon',
      category: 'abcdef',
      createdAt: '2020-04-15T11:39:22.545Z',
      updatedAt: '2020-04-15T11:39:22.545Z',
      __v: 0,
    },
    {
      _id: '5e97027056d48112dea8766c',
      root: true,
      option: [
        {
          linkedQuestion: [],
          _id: '5e97027056d48112dea8766f',
          optionType: 'radio',
          text: 'a',
        },
        {
          linkedQuestion: [],
          _id: '5e97027056d48112dea8766e',
          optionType: 'radio',
          text: 'b',
        },
        {
          linkedQuestion: [],
          _id: '5e97027056d48112dea8766d',
          optionType: 'radio',
          text: 'c',
        },
      ],
      ansOptionType: 'inputBox',
      superQuestion: false,
      title: 'Ques6',
      speciality: 'Surgeaon',
      category: 'abcdef',
      createdAt: '2020-04-15T12:47:44.950Z',
      updatedAt: '2020-04-15T12:47:44.950Z',
      __v: 0,
    },
    {
      _id: '5e97027856d48112dea87670',
      root: true,
      option: [
        {
          linkedQuestion: [],
          _id: '5e97027856d48112dea87673',
          optionType: 'radio',
          text: 'a',
        },
        {
          linkedQuestion: [],
          _id: '5e97027856d48112dea87672',
          optionType: 'radio',
          text: 'b',
        },
        {
          linkedQuestion: [],
          _id: '5e97027856d48112dea87671',
          optionType: 'radio',
          text: 'c',
        },
      ],
      ansOptionType: 'multiple',
      superQuestion: false,
      title: 'Ques71',
      speciality: 'Surgeaon',
      category: 'abcdef',
      createdAt: '2020-04-15T12:47:52.285Z',
      updatedAt: '2020-04-15T12:47:52.285Z',
      __v: 0,
    },
    {
      _id: '5e97028556d48112dea87674',
      root: true,
      option: [
        {
          linkedQuestion: [],
          _id: '5e97028556d48112dea87677',
          optionType: 'radio',
          text: 'a',
        },
        {
          linkedQuestion: [],
          _id: '5e97028556d48112dea87676',
          optionType: 'text',
          text: 'b',
        },
        {
          linkedQuestion: [],
          _id: '5e97028556d48112dea87675',
          optionType: 'radio',
          text: 'c',
        },
      ],
      ansOptionType: 'multiple',
      superQuestion: false,
      title: 'Ques7',
      speciality: 'Surgeaon',
      category: 'abcdef',
      createdAt: '2020-04-15T12:48:05.685Z',
      updatedAt: '2020-04-15T12:48:05.685Z',
      __v: 0,
    },
    {
      _id: '5e9702ab56d48112dea87678',
      root: true,
      option: [
        {
          linkedQuestion: [],
          _id: '5e9702ab56d48112dea8767b',
          optionType: 'checkbox',
          text: 'a',
        },
        {
          linkedQuestion: [],
          _id: '5e9702ab56d48112dea8767a',
          optionType: 'checkbox',
          text: 'b',
        },
        {
          linkedQuestion: [],
          _id: '5e9702ab56d48112dea87679',
          optionType: 'checkbox',
          text: 'c',
        },
      ],
      ansOptionType: 'single',
      superQuestion: false,
      title: 'Ques8',
      speciality: 'Surgeaon',
      category: 'abcdef',
      createdAt: '2020-04-15T12:48:43.665Z',
      updatedAt: '2020-04-15T12:48:43.665Z',
      __v: 0,
    },
    {
      _id: '5e9702b356d48112dea8767c',
      root: true,
      option: [
        {
          linkedQuestion: [],
          _id: '5e9702b356d48112dea8767f',
          optionType: 'checkbox',
          text: 'a',
        },
        {
          linkedQuestion: [],
          _id: '5e9702b356d48112dea8767e',
          optionType: 'checkbox',
          text: 'b',
        },
        {
          linkedQuestion: [],
          _id: '5e9702b356d48112dea8767d',
          optionType: 'checkbox',
          text: 'c',
        },
      ],
      ansOptionType: 'inputBox',
      superQuestion: false,
      title: 'Ques91',
      speciality: 'Surgeaon',
      category: 'abcdef',
      createdAt: '2020-04-15T12:48:51.356Z',
      updatedAt: '2020-04-15T12:48:51.356Z',
      __v: 0,
    },
    {
      _id: '5e9702c256d48112dea87680',
      root: true,
      option: [
        {
          linkedQuestion: [],
          _id: '5e9702c256d48112dea87683',
          optionType: 'text',
          text: 'a',
        },
        {
          linkedQuestion: [],
          _id: '5e9702c256d48112dea87682',
          optionType: 'checkbox',
          text: 'b',
        },
        {
          linkedQuestion: [],
          _id: '5e9702c256d48112dea87681',
          optionType: 'checkbox',
          text: 'c',
        },
      ],
      ansOptionType: 'multiple',
      superQuestion: false,
      title: 'Ques9',
      speciality: 'Surgeaon',
      category: 'abcdef',
      createdAt: '2020-04-15T12:49:06.049Z',
      updatedAt: '2020-04-15T12:49:06.049Z',
      __v: 0,
    },
  ],
  _id: '5dad6ba6f4ab551864e63f02',
};

const Questionnaire = props => {
  const placeRef = useRef(null);
  const submitRef = useRef(null);


    const dispatch = useDispatch();

  const [questionNumber, setQuestinNumber] = useState(0);
  const [qsList, setqsList] = useState([]);

  useEffect(() => {
    //     dispatch(gettingQuestion());
    // console.log(questions.question)
  }, []);

  const incrementQuestionNumber = () => {
    questions.question.length - 1 > questionNumber &&
      setQuestinNumber(questionNumber + 1);
    setqsList(null);
    // childRef.current.reset()
    console.log('````````````````````````````````````````````````');
    console.log(submitRef);
    submitRef.current.handelQuestionSubmit();
    if (questions.question.length === questionNumber + 1) {
      console.log('-----------------Done---------------');
      dispatch(doneQuestion())
      props.navigation.goBack();
    }
  };

  const decrementQuestionNumber = () => {
    1 <= questionNumber && setQuestinNumber(questionNumber - 1);
    setqsList(null);
  };

  return false ? (
    <ActivityIndicator
      size="large"
      color="#000"
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  ) : (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      {/* <ScrollView > */}
      <View
        style={{
          paddingBottom: 10,
          marginLeft: 30,
          marginTop: 30,
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
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
          {questions.question.map((item, index) => (
            <Spiner
              active={true}
              index={index}
              activeQuestion={questionNumber}
            />
          ))}
          {/* <Spiner active={false}/> */}
        </View>
        <ScrollView style={styles.wrapper}>
          <View ref={placeRef} style={{paddingBottom: 40}}>
            {/* For Array of questions we have to use loop */}
            {/* {questions.question.map(qs => ( */}
            <Question
              ref={submitRef}
              question={questions.question[questionNumber]}
            />
            {/* ))} */}
          </View>
        </ScrollView>
        <View>
          <View style={styles.action_controller}>
            <Button
              style={{paddingTop: 20}}
              deafult={true}
              title={'SKIP'}
              t_text={true}
              onlyBorder
              onClick={() =>
                /*incrementQuestionNumber()*/ decrementQuestionNumber()
              }
            />
            <Button
              deafult={true}
              title={'NEXT'}
              normal
              shadow
              onClick={() => incrementQuestionNumber()}
            />
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  point_holder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    marginTop: 20,
  },
});

const Spiner = props => (
  <View
    style={[
      {height: 6, width: 6, borderRadius: 100, margin: 10},
      props.activeQuestion >= props.index
        ? {backgroundColor: color.back_color}
        : {backgroundColor: color.text_on_bg},
    ]}
  />
);

const Question = React.forwardRef((props, ref) => {
  const {question} = props;
  const [ans, setAns] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const name = [];
  const answerArray = [];
  const nestedSubmit = useRef(null);
  const dispatch = useDispatch();

  const addAnswer = answer => {
    console.log('-------------*******----------------');
    console.log(answer);
    console.log('-------------*******----------------');
    const template = {question: answer.question, answer: answer.answer};

    setAns(tmp => [...tmp, {question: answer.question, answer: answer.answer}]);

    let i = 0;
    for (i; i < answerArray.length; i++) {
      if (answerArray[i].question === template.question) {
        console.log('matchMedia', i);
        answerArray[i] = template;
        break;
      }
      console.log(i);
    }
    console.log(answerArray.length);
    i === answerArray.length && answerArray.push(template);

    console.log(`Question: ${answer.question} and answer: ${answer.answer}`);

    if (answer.haveLinkedQuestion && !name.includes(answer.answer)) {
      answer.linkedQuestion.map(qs => {
        questionBuilder(qs);
        name.push(answer.answer);
      });
    } else {
      console.log(allQuestion);
      //       setAllQuestion(allQuestion[3])
    }
    console.log('***************/////////***************');
    console.log(answerArray);
  };

  useEffect(() => {
    console.log('From Questions QQQQQQ');
    console.log('From qs................');
    //     console.log(question);
    questionBuilder(question);
    return () => {
      setAllQuestion([]);
    };
  }, [question]);

  //   const addQuestion = qs => {
  //     console.log('From qs................');
  //     console.log(qs);
  //     setqsList([qsList, qs]);
  //   };

  useImperativeHandle(ref, () => ({
    handelQuestionSubmit() {
      console.log('from Nested submit.');
      console.log(ans);
      try {
        nestedSubmit.current.handelMultipleQuestionSubmit !== undefined &&
          nestedSubmit.current.handelMultipleQuestionSubmit();
        nestedSubmit.current.handelInputSubmit !== undefined &&
          nestedSubmit.current.handelInputSubmit();
      } catch (err) {
        console.log(err);
      }

      dispatch(saveAnswer(ans));
    },
  }));

  const questionBuilder = myQuestion => {
    console.log(myQuestion.ansOptionType);

    var cz = null;
    switch (myQuestion.ansOptionType) {
      case 'single':
        cz = (
          <SingleSelect
            question={myQuestion.title}
            answer={addAnswer}
            options={myQuestion.option}
          />
        );
        break;
      case 'multiple':
        cz = (
          <MultipleSelect
            ref={nestedSubmit}
            question={myQuestion.title}
            answer={addAnswer}
            options={myQuestion.option}
          />
        );
        break;
      case 'inputBox':
        cz = (
          <TextboxSelect
            ref={nestedSubmit}
            question={myQuestion.title}
            answer={addAnswer}
          />
        );
        break;
      default:
        null;
    }

    var newCz = (
      <View>
        <Text style={{paddingTop: 20, paddingBottom: 5}}>
          {myQuestion.title}
        </Text>
        {cz}
      </View>
    );
    setAllQuestion(qs => [...qs, newCz]);
  };
  return allQuestion === null || allQuestion === undefined ? (
    <Text>Loading</Text>
  ) : (
    <View ref={ref}>{allQuestion}</View>
  );
});

const SingleSelect = ({options, question, answer}) => {
  const [select, setSelect] = useState([]);
  const selectHeldelar = (ans, index) => {
    setSelect(ans);
    console.log(options);
    answer({
      question: question,
      answer: ans,
      haveLinkedQuestion: options[index].linkedQuestion.length > 0,
      linkedQuestion: options[index].linkedQuestion,
    });
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      {options.map((op, index) => (
        <Text
          key={index}
          style={[
            {
              borderWidth: 1,
              paddingVertical: 0,
              paddingHorizontal: 10,
              marginHorizontal: 6,
              marginVertical: 3,
              borderRadius: 3,
            },
            select.includes(op.text) && {
              color: color.white_color,
              backgroundColor: color.brand_color,
            },
          ]}
          onPress={() => selectHeldelar(op.text, index)}>
          {op.text}
        </Text>
      ))}
    </View>
  );
};

const MultipleSelect = React.forwardRef((props, ref) => {
  const {question, answer, options} = props;
  const [select, setSelect] = useState([]);

  const selectHeldelar = ans => {
    if (!select.includes(ans)) {
      setSelect([...select, ans]);
    } else {
      const s = select.filter(item => item !== ans);
      setSelect(s);
    }
    console.log(select);
  };

  useImperativeHandle(ref, () => ({
    handelMultipleQuestionSubmit() {
      console.log(select);
      const smp = {
        question: question,
        answer: select,
        haveLinkedQuestion: false,
        linkedQuestion: [],
      };
      answer(smp);
    },
  }));

  return (
    <View ref={ref}>
      {options.map((op, index) => (
        <View
          style={{
            margin: 10,
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <Text>{op.text}</Text>
          <View>
            <TouchableOpacity
              style={{
                width: 18,
                height: 18,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: color.brand_color,
              }}
              onPress={() => selectHeldelar(op.text)}>
              <Icon
                name="ios-checkmark"
                size={25}
                color={color.brand_color}
                style={{
                  position: 'absolute',
                  top: -5,
                  left: 3,
                  color: color.brand_colors,
                  opacity: select.includes(op.text) ? 1 : 0,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
});

const TextboxSelect = React.forwardRef((props, ref) => {
  const {question, answer} = props;
  const [myans, setAns] = useState('');
  const [my, setMy] = useState('nothing');

  useImperativeHandle(ref, () => ({
    handelInputSubmit() {
      console.log(my);
      const smp = {
        question: question,
        answer: my,
        haveLinkedQuestion: false,
        linkedQuestion: [],
      };
      answer(smp);
    },
  }));

  return (
    <View style={TextBoxStyle.container} ref={ref}>
      <View style={TextBoxStyle.inputHolder}>
        <TextInput
          placeholder="type something"
          style={TextBoxStyle.input}
          onChangeText={e => setMy(e)}
        />
      </View>
    </View>
  );
});

const TextBoxStyle = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 5,
    marginBottom: 5,
  },
  inputHolder: {},
  label: {
    fontSize: 10,
    color: '#616061',
  },
  input: {
    height: 30,
    padding: 0,
    paddingLeft: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: color.brand_color,
    borderRadius: 3,
    borderWidth: 1,
    width: '100%',
  },
});

const SubQuestion = ({
  subquestion,
  addAnswer,
  addQuestion,
  qsList,
  setqsList,
}) => {
  useEffect(() => {
    console.log('Form subquesto..');
    console.log(subquestion);
  }, []);
  return (
    <View>
      <Text>{subquestion.title}</Text>
      <Option
        setAnswer={addAnswer}
        option={subquestion.option}
        ansType={subquestion.ansOptionType}
        addQuestion={addQuestion}
        qslLst={qsList}
        setqsList={setqsList}
      />
    </View>
  );
};

const InputBox = props => {
  return (
    <View style={InputBoxStyle.container}>
      <View style={InputBoxStyle.inputHolder}>
        {/* <Text style={InputBoxStyle.label}>{`Enter ${props.label}`}</Text> */}
        <TextInput
          onChangeText={e => props.onChange(e)}
          name={'asd'}
          style={InputBoxStyle.input}
          secureTextEntry={props.secureText}
          placeholder={`Enter your ${props.label}`}
          placeholderTextColor={'#616061'}
          value="]popop"
        />
      </View>
    </View>
  );
};

const InputBoxStyle = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 5,
    marginBottom: 5,
  },
  inputHolder: {},
  label: {
    fontSize: 10,
    color: '#616061',
  },
  input: {
    height: 30,
    padding: 0,
    paddingLeft: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: color.brand_color,
    borderRadius: 3,
    borderWidth: 1,
    width: '100%',
  },
});

const Option = ({
  setAnswer,
  option,
  ansType,
  addQuestion,
  qsList,
  setqsList,
}) => {
  const [select, setSelect] = useState([]);
  const [txt, setText] = useState({fild: ''});

  const handelInput = e => {
    console.log(e.target);
    setText({...txt, fild: e});
  };

  const setTheAnswer = (ans, index) => {
    console.log(select.includes(ans));
    console.log(ansType);

    switch (ansType) {
      case 'single':
        console.log('single');
        setSelect(ans);
        qsList !== null && setqsList(qsList.pop());
        setAnswer(ans);
        option[index].linkedQuestion.map(item => {
          addQuestion(
            <SubQuestion
              subquestion={item}
              addAnswer={setAnswer}
              addQuestion={addQuestion}
              qsList={qsList}
              setqsList={setqsList}
            />,
          );
        });
        break;
      case 'multiple':
        console.log('multiplesss');
        console.log(ans);
        if (!select.includes(ans)) {
          setSelect([...select, ans]);
          console.log('000000000');
        } else {
          const s = select.filter(item => item !== ans);
          console.log(s);
          console.log(ans);
          setSelect(s);
          console.log('else');
        }
        break;
      case 'inputbox':
        addQuestion(<InputBox secureText={false} onChange={handelInput} />);
        break;
      default:
        setqsList(null);
        null;
    }

    console.log('bug!');
    console.log('Options > select');
    console.log(select);
  };

  return (
    <View>
      {ansType === 'inputbox' ? (
        <InputBox secureText={false} onChange={handelInput} />
      ) : (
        option.map((op, index) => (
          <TouchableOpacity
            style={[
              {
                padding: 5,
                borderWidth: 2,
                borderColor: color.brand_color,
                margin: 5,
              },
              select.includes(op.text) && {backgroundColor: color.brand_color},
            ]}
            onPress={() => setTheAnswer(op.text, index)}>
            <Text
              style={[select.includes(op.text) && {color: color.white_color}]}>
              {' '}
              {op.text}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default Questionnaire;
