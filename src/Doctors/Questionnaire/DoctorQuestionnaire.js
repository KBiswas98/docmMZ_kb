import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  useContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {color} from '../../config/styles/color';
import DoctorTopNavbar from '../../components/prefab/TopNavbar/DoctorTopNavbar';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../components/primitive/Button/Button';

const MyLinking = React.createContext();
const DoctorQuestionnaire = () => {
  const [isVisible, setVisible] = useState(false);
  const [more, setMore] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);

  const submitTheForm = () => {
    console.log('From DoctorQuestionnarie.');
    setVisible(true);
  };

  const addNewQuestion = () => {
    setQuestionCount(questionCount + 1);
    setMore([more, <QuestionModule path={questionCount + 1 + '/'} key={questionCount + 1}/>]);
  };

  return (
    <SafeAreaView style={{backgroundColor: color.background, flex: 1}}>
      <DoctorTopNavbar />
      <ScrollView style={{flex: 1, display: 'flex'}}>
        <ScrollView horizontal={true} style={{ minHeight: 400}}>
          <MyLinking.Provider value={isVisible}>
            <QuestionModule path={`${questionCount}/`} />
            {more}
          </MyLinking.Provider>
        </ScrollView>
        <View style={styles.action_controller}>
          <Button
            style={[styles.buttons]}
            deafult={true}
            title={'+'}
            t_text={true}
            onlyBorder
            onClick={() => addNewQuestion()}
          />
          <Button
            style={styles.buttons}
            deafult={true}
            title={'NEXT'}
            normal
            shadow
            onClick={() => submitTheForm()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  action_controller: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginVertical: 40,
    
  },
  buttons: {
    height: 40,
  },
});

const QuestionModule = props => {
  const [my, setMy] = useState([]);
  const [select, setSelect] = useState([]);
  const [qs, setQs] = useState([]);
  const [activeOption, setActiveOption] = useState(3);

  const options = [
    {text: 'single select'},
    {text: 'multiple select'},
    {text: 'textbox'},
  ];

  const flag = useContext(MyLinking);
  useEffect(() => {
    if (flag) {
      const obj = {
        path: props.path,
        question_type: 'option',
        question: my,
      };
      console.log(obj);
    }
  }, [flag]);

  const selectHeldelar = (ans, index) => {
    setSelect(ans);

    switch (ans) {
      case 'single select':
        setQs([]);
        setActiveOption(1);
        setQs([<Option path={props.path + my + '/'} />]);
        break;
      case 'multiple select':
        setQs([]);
        setActiveOption(2);
        setQs([<MultipleOption path={props.path + my + '/'} />]);
        break;
      case 'textbox':
        setQs([]);
        setActiveOption(3);
        setQs([<InputBox path={props.path + my + '/'} />]);
        break;
      default:
        null;
    }
  };

  return (
    <View style={{padding: 20, marginBottom: 100}}>
      <Text style={{marginVertical: 15, fontSize: 12}}>
        Ask your question :
      </Text>
      {flag && <Text>woks</Text>}
      <TextInput
        placeholder="type something"
        style={TextBoxStyle.input}
        onChangeText={e => setMy(e)}
      />
      <View style={{marginTop: 15, marginBottom: 5}}>
        <Text style={{marginVertical: 15, fontSize: 12}}>Answer mode</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {options.map((op, index) => (
            <Text
              key={index}
              style={[
                {
                  borderWidth: 1,
                  paddingVertical: 4,
                  paddingHorizontal: 12,
                  marginHorizontal: 6,
                  marginVertical: 3,
                  borderRadius: 30,
                  fontSize: 12,
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
      </View>
      <View>{qs}</View>
      {activeOption !== 3 && (
        <TouchableOpacity
          style={{marginVertical: 20, alignItems: 'center'}}
          onPress={() =>
            my.length > 0 &&
            setQs([
              ...qs,
              activeOption === 1 ? (
                <Option path={props.path + my + '/'} />
              ) : (
                <MultipleOption path={props.path + my + '/'} />
              ),
            ])
          }>
          <Icon
            name="pluscircleo"
            size={20}
            style={[my.length < 1 && {color: color.text_on_bg}]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const Option = props => {
  const [isVisible, setVisible] = useState(false);
  const [my, setMy] = useState([]);

  const flag = useContext(MyLinking);

  useEffect(() => {
    if (flag) {
      const obj = {
        path: props.path,
        question_type: 'option',
        question: my,
      };
      console.log(obj);
    }
  }, [flag]);

  return (
    <View
      style={{
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'dotted',
        padding: 20,
        marginVertical: 10,
        marginBottom: 0,
      }}>
      <View>
        <Text style={{marginVertical: 10, fontSize: 12, marginTop: -5}}>
          Option
        </Text>
        <TextInput
          placeholder="type something"
          style={TextBoxStyle.input}
          onChangeText={e => setMy(e)}
        />
        <TouchableOpacity
          onPress={() => my.length > 0 && setVisible(!isVisible)}>
          <Text
            style={[
              {fontSize: 10, marginVertical: 5},
              my.length < 1 && {color: color.text_on_bg},
            ]}>
            linked question
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {isVisible && <QuestionModule path={props.path + my + '/'} />}
      </View>
    </View>
  );
};

const MultipleOption = props => {
  const [isVisible, setVisible] = useState(false);
  const [my, setMy] = useState([]);

  const flag = useContext(MyLinking);

  useEffect(() => {
    const obj = {
      path: props.path,
      question_type: 'multiple',
      question: my,
    };
    console.log(obj);
  }, [flag]);

  return (
    <View
      style={{
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'dotted',
        padding: 20,
        marginVertical: 10,
        marginBottom: 0,
      }}>
      <View>
        <Text style={{marginVertical: 10, fontSize: 12, marginTop: -5}}>
          Option
        </Text>
        <TextInput
          placeholder="type something"
          style={TextBoxStyle.input}
          onChangeText={e => setMy(e)}
        />
        {/* <TouchableOpacity onPress={() => setVisible(!isVisible)}>
          <Text style={{fontSize: 10, marginVertical: 5}}>linked question</Text>
        </TouchableOpacity> */}
      </View>
      <View>
        {isVisible && <QuestionModule path={props.path + my + '/'} />}
      </View>
    </View>
  );
};

const InputBox = props => {
  const [my, setMy] = useState('nothing');

  const flag = useContext(MyLinking);

  useEffect(() => {
    const obj = {
      path: props.path,
      question_type: 'inputbox',
      question: my,
    };
    console.log(obj);
  }, [flag]);

  return (
    <View style={TextBoxStyle.container}>
      <View style={TextBoxStyle.inputHolder}>
        <TextInput
          placeholder="type something"
          style={TextBoxStyle.input}
          onChangeText={e => setMy(e)}
        />
      </View>
    </View>
  );
};

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
    borderWidth: 0,
    width: '100%',
    backgroundColor: color.white_color,
    elevation: 2,
  },
});

export default DoctorQuestionnaire;
