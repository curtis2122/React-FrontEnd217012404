import React from 'react';
//import articles from './data/articles.json';
import http from '../common/http-common.js'
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import NotFound from './notfound'

function DetailDog(props) {    
  const { aid } = useParams();  
  const [loading, setLoading] = React.useState(true)
  const [dog, setDog] = React.useState(null)
  const navigate = useNavigate();

   React.useEffect(()=> {
    http.get(`/dogs/${aid}`)
      .then((response)=> {
      console.log(response)
      setDog(response.data)
    })
   .then(()=>{ setLoading(false)})
    },[]);


 if (loading) {
   return <div>loading...</div>;} 
 else if(!dog) {
    return (
      <div>There is no such dog.</div>
    )
  } else {
   // console.log(article)
    return (
        <>    
          <h1>{dog.name}</h1>
          <p>{dog.age}</p>      
          <p>{dog.sex}</p>      
          <p>{dog.shelterid}</p>      
          <p>{dog.staffid}</p>      
          <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)} />
        </>
      )
  }
  /*
  for(const article of articles) {  
  if(article.id==aid)  {      
      return(
        <>    
          <h1>{article.title}</h1>
          <p>{article.fullText}</p>            
          <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)} />
        </>
      );
    }
  }
  */
}

export default DetailDog;