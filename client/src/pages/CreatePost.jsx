import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Image} from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'

import { preview, painter, painting } from '../assets'
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

import { download } from '../assets';
import { downloadImage } from '../utils';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
      if(form.prompt) {
        try {
            setGeneratingImg(true);
            const response = await fetch('https://malle-diha.onrender.com/api/v1/dalle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({ prompt: form.prompt }),
            })

            const data =await response.json();

            setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
        } catch (error) {
            alert(error);
        } finally {
          setGeneratingImg(false);

        }
      } else {
        alert('Please enter a prompt')
      }
  }


  const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('https://malle-diha.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form })
        })

        await response.json();
        alert('Success');
        navigate('/');

      } catch (err)  {
          alert(err) 
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image')
    }
  }

  const handleSM = () => {
      const randomPrompt = getRandomPrompt(form.prompt);
      setForm({ ...form, prompt: randomPrompt})
  }

  return (
     <section className="max-w-7xl mx-auto">
      <div>
           <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
           <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">pAInter AI will paint a stunning, imaginative image for you; just give him an idea and share them with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />


          <FormField
          labelName="Prompt"
          type="text"
          name="prompt"
          placeholder="a fortune-telling shiba inu reading your fate in a giant hamburger, digital art"
          value={form.prompt}
          handleChange={handleChange}
          isSM
          handleSM={handleSM}
        />
  <div className="flex">
<div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[400px] p-3 h-[400px] flex justify-center items-center">
          {form.photo ? (
            <Image 
            image= {{src: form.photo, title: form.prompt}}
            alt={form.prompt}
            className="w-full h-full object-contain"
            whileTap={{ scale: 1.2 }} />
            
            

          ) : (
            <img 
            src={preview}
            alt="preview"
            className="w-9/12 h-9/12 object-contain opacity-40" />

          )}

          {generatingImg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
              </div>
          )}

          
       
          </div>
        
       

     

          
          <div className="relative text-sm focus:ring-blue-500 focus:border-blue-500 w-[400px] p-3 h-[400px] flex justify-center items-center">
          <img 
            src={generatingImg ? painting : painter}
            alt="painter guy"
            className="object-contain" />

          
          </div>
          </div>
          </div>
          

          <div className="mt-5 flex gap-5">
            <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>

            {form.photo ? (

            
            <button type="button" onClick={() => downloadImage(form.prompt, form.photo)} className="outline-none bg-transparent border-none right-0">
         <img src={download} alt="download" className="w-6 h-6 object-contain" />
       </button>
            ) : (
              <button type="button" className="outline-none bg-transparent border-none right-0">
              <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
            </button>
             )}
          </div>

          <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >

            {loading ? 'Sharing...' : 'Share with the community'}
            </button>
             </div>
        </form>
    </section>
  );
};

export default CreatePost