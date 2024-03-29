import { CSSProperties } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory, useParams } from 'react-router-dom';
import capitalize from 'utils/capitalize';
import { changeInput, selectManipulateReducer } from 'slices/manipulate-slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import './textfield-category.scss';

const currencies: string[] = [
  'soccer',
  'movies',
  'music',
  'science',
  'tv',
  'history',
  'gaming',
  'misc',
];

type Props = {
  variant?: 'outlined' | 'standard' | 'filled' | undefined;
  style?: CSSProperties;
  className?: string;
  create?: boolean;
};

interface ParamTypes {
  quizCategory: string;
}

const TextFieldCategory = ({
  variant = 'outlined',
  style = { marginTop: '20px', font: '16px Overpass' },
  className,
  create = false,
}: Props) => {
  const { quizCategory } = useParams<ParamTypes>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { category } = useAppSelector(selectManipulateReducer);
  return (
    <TextField
      variant={variant}
      className={`Quiz-form__name ${className}`}
      fullWidth
      label="Category"
      required
      value={create ? category : quizCategory}
      onChange={(e) => {
        if (create) {
          dispatch(changeInput({ value: e.target.value, type: 'category' }));
        } else {
          history.push(`/quizzes/category/${e.target.value}`);
        }
      }}
      select
      style={style}
    >
      {currencies.map((option) => (
        <MenuItem key={option} value={option}>
          {capitalize(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default TextFieldCategory;
