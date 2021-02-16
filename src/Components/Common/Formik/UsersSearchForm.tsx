
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FilterType } from '../../../Redux/usersReducer'
import { useSelector } from 'react-redux'
import { getUsersFilter } from '../../../Selectors/Selectors'
import { FiRewind } from 'react-icons/fi'


type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: FriendFormType
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)
    

    const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {

        const filter: FilterType = {  // Делаем преобразования из string к boolean.
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        
        props.onFilterChanged(filter);
        setSubmitting(false);
    }

    return (
        <div>
            <Formik
                enableReinitialize  // Мы можем здесь написать ={true} но и без этого он будет работать!
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
                validate={ usersSearchFormValidate }

                onSubmit={ submit }
                >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>Search</button>
                    </Form>
                )}
            </Formik>        
        </div>
    )
})
