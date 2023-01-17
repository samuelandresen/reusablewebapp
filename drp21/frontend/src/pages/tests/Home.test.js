import renderer from 'react-test-renderer';
import AppRouter from '../../AppRouter';


describe('NavBar component', () => {
    it('matches the snapshot', () => {
        const tree = renderer.create(<AppRouter/>).toJSON()

        expect(tree).toMatchSnapshot()
    })
})