import { getJobs } from "../Services/JobsService";
import { CountryInterface, Job, SelectedCountry } from "../models/models";

interface Props {
    item: CountryInterface
}

const ListItem = ({ item }: Props) => {
    const handleSelectedCountry = async () => {
        try {
            const jobsData = await getJobs(item.cca2);
           
            const jobs: Job[] = jobsData.data.results.map((jobData:any) => ({
                id: jobData.id,
                title: jobData.title,
                tag: jobData.category.tag,
                label: jobData.category.label,
                description: jobData.description,
                companyName: jobData.company.display_name,
                latlong: [jobData.latitude, jobData.longitude],
                redirectUrl: jobData.redirect_url,
                salaryPrediction: parseInt(jobData.salary_is_predicted, 10),
                created: jobData.created,
            }));

            const selectedCountry: SelectedCountry = {
                country: item,
                jobs: jobs, // Assign the array of mapped jobs.
            };

             console.log('selectedCountry ', selectedCountry)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (<button
        type="button"
        onClick={() => {
            handleSelectedCountry()
        }}

        className="flex w-full cursor-pointer rounded-lg p-4 text-left transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:text-teal-100 focus:outline-teal-500 focus:border-teal-500 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
        <img className="inline-block h-10 w-10 rounded-md ring-2 ring-white mr-3" src={item.flagUrl} alt={item.flagUrl} />
        <div>{item.name}</div>
    </button>
    )
}

export default ListItem;