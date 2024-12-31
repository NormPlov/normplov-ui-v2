import React from "react";
import Image from "next/image";
import Link from "next/link";
import CardTeam from "@/components/About-us/CardTeam";

export default function AboutUs() {
  return (
    <div className=" bg-slate-50">
      <section className="grid grid-cols-1 bg-green-50 lg:grid-cols-2 md:grid-cols-1 gap-2 lg:px-20  md:px-20 px-10 lg:h-[650px]  md:h-auto h-[1050px]">
        <div className="max-w-7xl mx-auto my-4 md:my-6 space-y-4 py-10 ">
          <h1 className="text-secondary lg:text-5xl md:text-5xl text-3xl font-semibold">អំពីយើង</h1>
          <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed">
            ជួយសិស្សថ្នាក់ទីមធ្យមសិក្សាទុតិយភូមិ
            ក្នុងការជ្រើសរើសមុខវិជ្ជាសិក្សានៅសាកលវិទ្យាល័យដោយផ្តល់ឱ្យពួកគេនូវឧបករណ៍
            និងឱកាសសិក្សាស្វែងយល់អំពីសមត្ថភាព ការចាប់អារម្មណ៍ និងគោលដៅអនាគត។
            យើងបំពេញបេសកកម្មនេះតាមរយៈការធ្វើតេស្តជំនាញ មុខរបរ
            ការចូលរួមក្នុងសកម្មភាព និងការចែករំលែកចំណេះដឹងពីវិស័យនានា។
          </p>
          <div className="py-4">
            <Link
              href="/test"
              className="bg-emerald-500  text-white px-6 py-2 md:px-8 md:py-2 lg:px-8 lg:py-2 rounded-xl text-md md:text-lg lg:text-lg hover:bg-emerald-600 transition-colors"
            >
              ចាប់ផ្តើម
            </Link>
          </div>
        </div>
        <div className="flex  justify-center items-start w-full h-[700px]  py-10">
          <div>
            <div className=" absolute  lg:ml-14 md:ml-10 bg-green-100 lg:w-[600px] md:w-[580px]  h-[400px] lg:mt-20 md:mt-24 rounded-xl"></div>
            <Image
              src="/assets/cover-about.jpg"
              width={200}
              height={200}
              className="relative w-[570px] lg:h-64 md:h-65 h-40 lg:ml-40 md:ml-[100px] rounded-xl mt-8 object-fill "
              alt=""
            />
            <Image
              src="/assets/cover-about.jpg"
              width={200}
              height={200}
              className=" relative lg:ml-0 md:-ml-0 w-[450px] h-50 mr-10 rounded-xl mt-8 object-fill"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="flex lg:px-20 md:px-20 px-8 mt-10    max-w-full justify-center ">
        <div className="flex max-w-7xl mx-auto  my-4 md:my-6 ">
          <div className="mt-10 space-y-4 lg:w-[65%] md:w-[60%] h-auto">
            <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold">គោលបំណង</div>
            <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed">
              ក្រុមរបស់យើងប្តេជ្ញាចិត្តក្នុងការផ្តល់ជូននូវធនធាន ការណែនាំ
              និងការគាំទ្រដែលអ្នកត្រូវការដើម្បីធ្វើការសម្រេចចិត្តដោយមានព័ត៌មានគ្រប់គ្រាន់អំពីអនាគតរបស់អ្នក។
              ជាមួយនឹងឧបករណ៍ និងការណែនាំរបស់យើង
              អ្នកនឹងមានទំនុកចិត្តក្នុងការជ្រើសរើសផ្លូវការសិក្សាដែលត្រូវនឹងគោលដៅ
              និងក្តីស្រមៃរបស់អ្នក។
            </p>
          </div>
          <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
            <div className="flex lg:justify-end md:justify-end  lg:items-start md:items-center">
              <Image
                src="/assets/Team goals-bro.png"
                width={300}
                height={300}
                className=" relative lg:w-[400px] lg:h-[400px] md:w-[420px] md:h-[400px] rounded-xl object-fill lg:-mt-8 md:mt-8"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex lg:px-20 md:px-20 px-8 max-w-full justify-center  ">
        <div className="flex max-w-7xl mx-auto my-4 md:my-6 ">
          <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
            <div className="flex justify-start">
              <Image
                src="/assets/Create-bro.png"
                width={300}
                height={300}
                className=" relative lg:w-[400px] lg:h-[400px] md:w-[420px] md:h-[390px]  rounded-xl object-fill lg:-mt-8 md:mt-8"
                alt=""
              />
            </div>
          </div>
          <div className="mt-10 space-y-4 lg:w-[65%] md:w-[70%] h-auto">
            <div className=" text-primary lg:text-4xl md:text-4xl text-3xl  font-semibold text-end">
              ចក្ខុវិស័យ
            </div>
            <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed text-end">
              ក្រុមរបស់យើងប្តេជ្ញាចិត្តក្នុងការផ្តល់ជូននូវធនធាន ការណែនាំ
              និងការគាំទ្រដែលអ្នកត្រូវការដើម្បីធ្វើការសម្រេចចិត្តដោយមានព័ត៌មានគ្រប់គ្រាន់អំពីអនាគតរបស់អ្នក។
              ជាមួយនឹងឧបករណ៍ និងការណែនាំរបស់យើង
              អ្នកនឹងមានទំនុកចិត្តក្នុងការជ្រើសរើសផ្លូវការសិក្សាដែលត្រូវនឹងគោលដៅ
              និងក្តីស្រមៃរបស់អ្នក។
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mt-4  mx-auto my-4 md:my-6 flex justify-center ">
        <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold ">អ្នកណែនាំ</div>
      </section>
      <section className="flex px-20   max-w-full h-[650px] py-20  justify-center  ">
        <div className="lg:flex md:block lg:space-x-[200px] md:space-x-0   max-w-7xl mx-auto my-4 md:my-6  ">
          <div className=" mb-10">
            <Image
              src="/assets/cher_mey.png"
              width={200}
              height={200}
              className=" lg:w-[390px] lg:h-[320px]  md:w-[390px] md:h-[320px] w-[240px] h-[200px]  "
              alt=""
            />
            <div className="flex mr-6 justify-center text-textprimary text-2xl mt-[20px]">
              អ្នកគ្រូ មុំ រស្មី
            </div>
            <div className="flex mr-6 justify-center text-textprimary text-2xl -mt-6">
              <ul className="wrapper">
                <li className="icon facebook">
                  <span className="tooltip">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    height="1.2em"
                    viewBox="0 0 320 512"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </li>
                <li className="icon twitter">
                  <span className="tooltip">Twitter</span>
                  <svg
                    className="twitter"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    height="1.8em"
                  >
                    <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                  </svg>
                </li>
                <li className="icon instagram">
                  <span className="tooltip">Instagram</span>
                  <svg
                    viewBox="0 0 16 16"
                    className="bi bi-instagram"
                    fill="currentColor"
                    height="1.2em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                  </svg>
                </li>
              </ul>
            </div>
          </div>
          <div className=" ">
            <Image
              src="/assets/cher_leang copy 2.png"
              width={200}
              height={200}
              className="lg:w-[390px] lg:h-[320px]  md:w-[390px] md:h-[320px] w-[240px] h-[200px]"
              alt=""
            />
            <div className="flex mr-6 justify-center text-textprimary text-2xl mt-[20px]">
              លោកគ្រូ​ អ៉ឹង មួយលាង
            </div>
            <div className="flex mr-6 justify-center text-textprimary text-2xl -mt-6">
              <ul className="wrapper">
                <li className="icon facebook">
                  <span className="tooltip">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    height="1.2em"
                    viewBox="0 0 320 512"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </li>
                <li className="icon twitter">
                  <span className="tooltip">Twitter</span>
                  <svg
                    className="twitter"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    height="1.8em"
                  >
                    <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                  </svg>
                </li>
                <li className="icon instagram">
                  <span className="tooltip">Instagram</span>
                  <svg
                    viewBox="0 0 16 16"
                    className="bi bi-instagram"
                    fill="currentColor"
                    height="1.2em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-full h-40 lg:mt-0 md:mt-[450px] mt-[190px]  items-center  bg-slate-50 mx-auto   flex justify-center ">
        <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold ">សមាជិកក្រុម</div>
      </section>
      <section className=" bg-slate-50">
        <CardTeam />
      </section>
    </div>
  );
}
